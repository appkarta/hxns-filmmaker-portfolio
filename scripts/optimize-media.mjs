#!/usr/bin/env node
/**
 * Prepares a new project's media for the web (requires ffmpeg + ffprobe in PATH).
 *
 *   npm run media -- "<path to file>" <vertical|horizontal|brands|personal> <project-id> [--poster-at 3.5] [--preview-at 8]
 *
 * Video → public/videos/<category>/<id>.mp4            (H.264, 720p short side, AAC audio, fast start)
 *         public/videos/<category>/<id>-preview.mp4    (5 s muted loop for hover / in-view previews)
 *         public/images/projects/<category>/<id>.webp  (poster)
 * Image → public/images/projects/<category>/<id>.webp  (max 1600 px)
 * The untouched original is copied to media/originals/ (ignored by git).
 * At the end it prints an entry to paste into data/projects.ts.
 */
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { extname, join, resolve } from "node:path";

const CATEGORIES = ["vertical", "horizontal", "brands", "personal"];
const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? Number(args[i + 1]) : undefined;
};
const [input, category, id] = args.filter((a, i) => !a.startsWith("--") && !args[i - 1]?.startsWith("--"));

if (!input || !CATEGORIES.includes(category) || !/^[a-z0-9-]+$/.test(id ?? "")) {
  console.error('Usage: npm run media -- "<file>" <vertical|horizontal|brands|personal> <project-id>');
  console.error("       project-id: lowercase letters, numbers and dashes, e.g. reel-cafe-2026");
  process.exit(1);
}
if (!existsSync(input)) {
  console.error(`File not found: ${input}`);
  process.exit(1);
}

const root = resolve(import.meta.dirname, "..");
const run = (cmd, a) => execFileSync(cmd, a, { stdio: ["ignore", "pipe", "inherit"] }).toString().trim();
const ff = (a) => run("ffmpeg", ["-loglevel", "error", "-y", ...a]);
const mb = (f) => `${(statSync(f).size / 1e6).toFixed(1)} MB`;
const ext = extname(input).toLowerCase();
const isImage = [".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".heic"].includes(ext);

const originals = join(root, "media", "originals");
mkdirSync(originals, { recursive: true });
const original = join(originals, `${id}${ext}`);
if (!existsSync(original)) copyFileSync(input, original);

const imgDir = join(root, "public", "images", "projects", category);
mkdirSync(imgDir, { recursive: true });
const poster = join(imgDir, `${id}.webp`);

let aspect = category === "vertical" ? "9:16" : "16:9";
const entry = { id, category };

if (isImage) {
  ff(["-i", input, "-vf", "scale='min(1600,iw)':-2", "-q:v", "85", poster]);
  Object.assign(entry, { mediaType: "image", media: `/images/projects/${category}/${id}.webp` });
  console.log(`✓ image  ${poster} (${mb(poster)})`);
} else {
  const [w, h] = run("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "csv=p=0", input])
    .split(",")
    .map(Number);
  const duration = Number(run("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", input]));
  const portrait = h > w;
  const r = w / h;
  aspect = portrait ? (r < 0.7 ? "9:16" : r < 0.9 ? "4:5" : "1:1") : r > 2.2 ? "21:9" : "16:9";
  const scale = portrait ? "scale=720:-2" : "scale=-2:720";
  const small = portrait ? "scale=360:-2" : "scale=640:-2";

  const vidDir = join(root, "public", "videos", category);
  mkdirSync(vidDir, { recursive: true });
  const out = join(vidDir, `${id}.mp4`);
  const preview = join(vidDir, `${id}-preview.mp4`);
  const h264 = ["-c:v", "libx264", "-preset", "slow", "-profile:v", "high", "-pix_fmt", "yuv420p", "-movflags", "+faststart"];

  ff(["-i", input, "-vf", `${scale}:flags=lanczos`, ...h264, "-crf", "23", "-c:a", "aac", "-b:a", "128k", out]);
  const previewAt = flag("--preview-at") ?? Math.max(0, duration * 0.2);
  ff(["-ss", String(previewAt), "-t", "5", "-i", input, "-vf", small, ...h264, "-crf", "27", "-an", preview]);
  const posterAt = flag("--poster-at") ?? Math.min(duration * 0.1, 3);
  ff(["-ss", String(posterAt), "-i", input, "-frames:v", "1", "-vf", scale, "-q:v", "82", poster]);

  Object.assign(entry, {
    mediaType: "video",
    media: `/videos/${category}/${id}.mp4`,
    thumbnail: `/images/projects/${category}/${id}.webp`,
    preview: `/videos/${category}/${id}-preview.mp4`,
  });
  console.log(`✓ video    ${out} (${mb(input)} → ${mb(out)})`);
  console.log(`✓ preview  ${preview} (${mb(preview)})`);
  console.log(`✓ poster   ${poster}`);
  if (statSync(out).size > 50e6) console.warn("! The video is over 50 MB. Consider uploading it to YouTube/Vimeo and using media: \"youtube:<ID>\".");
}

console.log(`✓ original kept in media/originals/${id}${ext}\n`);
console.log("Paste this into data/projects.ts and fill in the rest:\n");
console.log(`  {
    id: "${id}",
    title: "TODO title",
    category: "${category}",
    // client: "",
    // tag: "",
    // year: "${new Date().getFullYear()}",
    // role: "",
    // description: { es: "", en: "" },
    mediaType: "${entry.mediaType}",
    media: "${entry.media}",${entry.thumbnail ? `\n    thumbnail: "${entry.thumbnail}",\n    preview: "${entry.preview}",` : ""}
    aspect: "${aspect}",
    // alt: { es: "", en: "" },
  },`);
