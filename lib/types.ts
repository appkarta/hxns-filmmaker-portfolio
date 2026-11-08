import type { L } from "./i18n";

/** Text shown on the site: one string for both languages, or { es: "…", en: "…" } */
export type Text = string | L;

/** The four areas of the Work section */
export type WorkCategory = "vertical" | "horizontal" | "brands" | "events" | "personal";

export type Aspect = "9:16" | "16:9" | "21:9" | "5:4" | "4:5" | "3:4" | "1:1";

export type Project = {
  /** Unique, URL-friendly id. Also the share link: hxnss.co/#work/<id> */
  id: string;
  title: Text;
  category: WorkCategory;
  /** Client or brand (leave out for personal work) */
  client?: string;
  /** Short label such as "Brand Content / Social Media" */
  tag?: Text;
  year?: string;
  /** What you did, e.g. "Edición" or { es: "Rodaje y edición", en: "Shooting & edit" } */
  role?: Text;
  description?: Text;
  /** Optional line shown large next to the project (used in Personal / Experiments) */
  quote?: Text;
  /**
   * - video: media is an MP4 in /public ("/videos/…"), or "youtube:<ID>" / "vimeo:<ID>"
   * - image: media is an image in /public; add more in `gallery`
   */
  mediaType: "video" | "image";
  media: string;
  gallery?: string[];
  /** Alt text for each `gallery` image, in the same order (falls back to `alt`) */
  galleryAlt?: Text[];
  /** Cover image (poster). Strongly recommended for videos */
  thumbnail?: string;
  /** Short muted loop (3–6 s) that plays on hover / when on screen */
  preview?: string;
  /** Defaults: 9:16 for vertical work, 16:9 for everything else */
  aspect?: Aspect;
  /** Featured projects are shown first inside their category */
  featured?: boolean;
  /** Description of the cover image for screen readers and search engines */
  alt?: Text;
};

export type Service = {
  title: L;
  description: L;
  /** Small technical note shown as a graphic detail */
  detail: L;
  glyph: "frame" | "timeline" | "brand" | "vertical" | "wave" | "wheel" | "poster" | "type" | "camera";
  image: string;
};
