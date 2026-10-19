/**
 * HXNS contact form → Resend.
 * A tiny Cloudflare Worker: receives the form JSON from https://hxnss.co, validates it,
 * filters obvious bots and sends the message to your inbox through the Resend API.
 *
 * Secrets / vars (set in Cloudflare, never in the website code):
 *   RESEND_API_KEY   secret  — from https://resend.com/api-keys
 *   CONTACT_TO       secret  — inbox that receives the messages
 *   CONTACT_FROM     var     — sender, e.g. "HXNS <hola@hxnss.co>" once the domain is verified in Resend
 *   ALLOWED_ORIGINS  var     — comma-separated list of sites allowed to post
 */

export interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO: string;
  CONTACT_FROM?: string;
  ALLOWED_ORIGINS?: string;
}

type Payload = {
  name?: unknown;
  email?: unknown;
  type?: unknown;
  timing?: unknown;
  message?: unknown;
  website?: unknown;
  elapsed?: unknown;
  locale?: unknown;
  page?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_BODY = 20_000;
const DEFAULT_FROM = "HXNS Website <onboarding@resend.dev>";

// Best-effort, per-instance rate limit: 5 messages / 10 min / IP
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

function cors(origin: string | null, env: Env): Record<string, string> {
  const allowed = (env.ALLOWED_ORIGINS ?? "https://hxnss.co,https://www.hxnss.co")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (!origin || !allowed.includes(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(body: unknown, status: number, headers: Record<string, string>) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", ...headers } });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin");
    const headers = cors(origin, env);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: headers["Access-Control-Allow-Origin"] ? 204 : 403, headers });
    }
    if (request.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405, headers);
    if (!headers["Access-Control-Allow-Origin"]) return json({ ok: false, error: "origin_not_allowed" }, 403, headers);
    if (!env.RESEND_API_KEY || !env.CONTACT_TO) return json({ ok: false, error: "not_configured" }, 500, headers);

    const raw = await request.text();
    if (raw.length > MAX_BODY) return json({ ok: false, error: "too_large" }, 413, headers);

    let data: Payload;
    try {
      data = JSON.parse(raw) as Payload;
    } catch {
      return json({ ok: false, error: "bad_json" }, 400, headers);
    }

    // Bots: filled the hidden field or submitted faster than a person can type → pretend success
    const elapsed = typeof data.elapsed === "number" ? data.elapsed : 0;
    if (str(data.website, 200) || (elapsed > 0 && elapsed < 2500)) return json({ ok: true }, 200, headers);

    const name = str(data.name, 120);
    const email = str(data.email, 200);
    const message = str(data.message, 5000);
    const type = str(data.type, 120);
    const timing = str(data.timing, 120);
    const locale = str(data.locale, 5) === "es" ? "es" : "en";
    const page = str(data.page, 300);

    const invalid: string[] = [];
    if (!name) invalid.push("name");
    if (!EMAIL_RE.test(email)) invalid.push("email");
    if (message.length < 10) invalid.push("message");
    if (invalid.length) return json({ ok: false, error: "invalid", fields: invalid }, 422, headers);

    const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
    if (limited(ip)) return json({ ok: false, error: "rate_limited" }, 429, headers);

    const rows: [string, string][] = [
      ["Name", name],
      ["Email", email],
      ["Project", type || "—"],
      ["Timing", timing || "—"],
      ["Language", locale === "es" ? "Español" : "English"],
      ["Page", page || "—"],
    ];
    const html = `
      <div style="font-family:Helvetica,Arial,sans-serif;background:#080A0D;color:#F2F5F8;padding:32px">
        <p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#91B8FF;margin:0 0 8px">HXNS — New project inquiry</p>
        <h1 style="font-size:28px;margin:0 0 24px">${escape(name)}</h1>
        <table style="border-collapse:collapse;font-size:14px;margin-bottom:24px">
          ${rows
            .map(
              ([k, v]) =>
                `<tr><td style="padding:6px 16px 6px 0;color:#A5ADB8">${k}</td><td style="padding:6px 0">${escape(v)}</td></tr>`,
            )
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
        to: env.CONTACT_TO.split(",").map((s) => s.trim()),
        reply_to: email,
        subject: `New project — ${type || "Inquiry"} — ${name}`,
        html,
        text,
      }),
    });

    if (!res.ok) {
      console.log("resend_error", res.status, await res.text());
      return json({ ok: false, error: "send_failed" }, 502, headers);
    }
    return json({ ok: true }, 200, headers);
  },
};
