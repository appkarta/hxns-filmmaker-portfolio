/**
 * HXNS contact form → Resend.
 * A tiny Cloudflare Worker: receives the form JSON from https://hxnss.co, validates it,
 * filters bots, rate-limits abuse and sends the message to your inbox through the Resend API.
 *
 * Secrets (Cloudflare, never in the website code):
 *   RESEND_API_KEY     — from https://resend.com/api-keys
 *   CONTACT_TO         — inbox that receives the messages
 *   TURNSTILE_SECRET   — optional; when set, every message must carry a valid Turnstile token
 * Vars (wrangler.toml):
 *   CONTACT_FROM, ALLOWED_ORIGINS
 * Bindings (wrangler.toml):
 *   IP_LIMITER, GLOBAL_LIMITER — Cloudflare rate limiting
 */

type RateLimiter = { limit(options: { key: string }): Promise<{ success: boolean }> };

export interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO: string;
  CONTACT_FROM?: string;
  ALLOWED_ORIGINS?: string;
  TURNSTILE_SECRET?: string;
  IP_LIMITER?: RateLimiter;
  GLOBAL_LIMITER?: RateLimiter;
}

type Payload = Record<string, unknown>;

// Conservative address syntax: no spaces, quotes, angle brackets, commas or second "@"
const EMAIL_RE = /^[A-Za-z0-9._%+-]{1,64}@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,24}$/;
const MAX_BODY = 16_000;
const MIN_ELAPSED_MS = 2500;
const DEFAULT_FROM = "HXNS Website <onboarding@resend.dev>";
const DEFAULT_ORIGINS = "https://hxnss.co,https://www.hxnss.co";

/** Options offered by the form (EN + ES). Anything else is reported as "Other". */
const PROJECT_TYPES = new Set([
  "Social media videos", "Music video", "Visualizer / Spotify Canvas", "Graphic pieces (covers, posters…)",
  "Motion graphics", "Brand or event content", "Something else",
  "Videos para redes sociales", "Videoclip", "Piezas gráficas (portadas, pósters…)",
  "Contenido para marca o evento", "Otra cosa",
]);
const TIMINGS = new Set([
  "As soon as possible", "This month", "In 1–3 months", "Just exploring",
  "Lo antes posible", "Este mes", "En 1–3 meses", "Solo estoy explorando",
]);

// In-memory limiter (per isolate): 3 requests / minute / IP, combined with the Cloudflare binding
const hits = new Map<string, number[]>();
function localLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 3;
}

/** Trim, drop control characters (incl. CR/LF → no header tricks) and cap length. */
function clean(v: unknown, max: number, multiline = false) {
  if (typeof v !== "string") return "";
  const s = multiline
    ? v.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0009\u000B-\u001F\u007F\p{Zl}\p{Zp}]/gu, "")
    : v.replace(/[\u0000-\u001F\u007F\p{Zl}\p{Zp}]/gu, " ");
  return s.trim().slice(0, max);
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

function allowedOrigins(env: Env) {
  return (env.ALLOWED_ORIGINS || DEFAULT_ORIGINS)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

const BASE_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
};

function corsHeaders(origin: string | null, env: Env): Record<string, string> {
  if (!origin || !allowedOrigins(env).includes(origin)) return { Vary: "Origin" };
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(body: unknown, status: number, headers: Record<string, string>) {
  return new Response(JSON.stringify(body), { status, headers: { ...BASE_HEADERS, ...headers } });
}

async function verifyTurnstile(secret: string, token: string, ip: string) {
  if (!token || token.length > 2048) return false;
  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin");
    const headers = corsHeaders(origin, env);
    const allowed = Boolean(headers["Access-Control-Allow-Origin"]);

    if (request.method === "OPTIONS") return new Response(null, { status: allowed ? 204 : 403, headers });
    if (request.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405, { ...headers, Allow: "POST, OPTIONS" });
    // Browsers always send Origin on cross-site POST; scripts without it are rejected too.
    if (!allowed) return json({ ok: false, error: "origin_not_allowed" }, 403, headers);

    // Rate limits before any work: per IP and for the whole form (protects the Resend quota)
    const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
    // Cloudflare limiter is shared but eventually consistent; the in-memory one stops bursts hitting the same instance
    const ipOk = !localLimited(ip) && (env.IP_LIMITER ? (await env.IP_LIMITER.limit({ key: `ip:${ip}` })).success : true);
    const globalOk = env.GLOBAL_LIMITER ? (await env.GLOBAL_LIMITER.limit({ key: "global" })).success : true;
    if (!ipOk || !globalOk) return json({ ok: false, error: "rate_limited" }, 429, { ...headers, "Retry-After": "60" });

    if (!(request.headers.get("Content-Type") ?? "").toLowerCase().startsWith("application/json")) {
      return json({ ok: false, error: "unsupported_media_type" }, 415, headers);
    }
    const declared = Number(request.headers.get("Content-Length") ?? "0");
    if (declared > MAX_BODY) return json({ ok: false, error: "too_large" }, 413, headers);
    const raw = await request.text();
    if (raw.length > MAX_BODY) return json({ ok: false, error: "too_large" }, 413, headers);

    if (!env.RESEND_API_KEY || !env.CONTACT_TO) return json({ ok: false, error: "not_configured" }, 500, headers);

    let data: Payload;
    try {
      const parsed: unknown = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
      data = parsed as Payload;
    } catch {
      return json({ ok: false, error: "bad_json" }, 400, headers);
    }

    // Bots: filled the hidden field or submitted faster than a person can type → pretend success
    const elapsed = typeof data.elapsed === "number" ? data.elapsed : 0;
    if (clean(data.website, 200) || elapsed < MIN_ELAPSED_MS) return json({ ok: true }, 200, headers);

    if (env.TURNSTILE_SECRET) {
      const human = await verifyTurnstile(env.TURNSTILE_SECRET, clean(data.turnstile, 2048), ip);
      if (!human) return json({ ok: false, error: "captcha_failed" }, 403, headers);
    }

    const name = clean(data.name, 120);
    const email = clean(data.email, 254);
    const message = clean(data.message, 5000, true);
    const rawType = clean(data.type, 120);
    const rawTiming = clean(data.timing, 120);
    const type = PROJECT_TYPES.has(rawType) ? rawType : rawType ? "Other" : "—";
    const timing = TIMINGS.has(rawTiming) ? rawTiming : "—";
    const locale = data.locale === "es" ? "es" : "en";
    const pageRaw = clean(data.page, 300);
    const page = allowedOrigins(env).some((o) => pageRaw === o || pageRaw.startsWith(`${o}/`)) ? pageRaw : "—";

    const invalid: string[] = [];
    if (name.length < 2) invalid.push("name");
    if (!EMAIL_RE.test(email)) invalid.push("email");
    if (message.length < 10) invalid.push("message");
    if (invalid.length) return json({ ok: false, error: "invalid", fields: invalid }, 422, headers);

    const rows: [string, string][] = [
      ["Name", name],
      ["Email", email],
      ["Project", type],
      ["Timing", timing],
      ["Language", locale === "es" ? "Español" : "English"],
      ["Page", page],
    ];
    const html = `
      <div style="font-family:Helvetica,Arial,sans-serif;background:#080A0D;color:#F2F5F8;padding:32px">
        <p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#91B8FF;margin:0 0 8px">HXNS — New project inquiry</p>
        <h1 style="font-size:28px;margin:0 0 24px">${escape(name)}</h1>
        <table style="border-collapse:collapse;font-size:14px;margin-bottom:24px">
          ${rows
            .map(([k, v]) => `<tr><td style="padding:6px 16px 6px 0;color:#A5ADB8">${k}</td><td style="padding:6px 0">${escape(v)}</td></tr>`)
            .join("")}
        </table>
        <div style="font-size:16px;line-height:1.6;white-space:pre-wrap;border-top:1px solid #202630;padding-top:20px">${escape(message)}</div>
      </div>`;
    const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${message}`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: env.CONTACT_FROM || DEFAULT_FROM,
        to: env.CONTACT_TO.split(",").map((s) => s.trim()).filter(Boolean),
        reply_to: email,
        subject: `New project — ${type === "—" ? "Inquiry" : type} — ${name}`.slice(0, 180),
        html,
        text,
      }),
    });

    if (!res.ok) {
      // Log only the status: the response body may echo submitted data
      console.log("resend_error", res.status);
      return json({ ok: false, error: "send_failed" }, 502, headers);
    }
    return json({ ok: true }, 200, headers);
  },
};
