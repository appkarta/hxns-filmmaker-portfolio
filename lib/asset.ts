const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a /public path with the deploy base path. Absolute URLs pass through. */
export function asset(path: string): string {
  if (!path || /^https?:\/\//.test(path)) return path;
  return `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Frames → SMPTE-style timecode at 24 fps: HH:MM:SS:FF */
export function timecode(seconds: number, fps = 24): string {
  const s = Math.max(0, seconds || 0);
  const total = Math.floor(s * fps);
  const ff = total % fps;
  const secs = Math.floor(total / fps);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(Math.floor(secs / 3600))}:${pad(Math.floor((secs % 3600) / 60))}:${pad(secs % 60)}:${pad(ff)}`;
}

export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}
