import type { L } from "./i18n";

/** Every text field is written in both languages: { en: "...", es: "..." } */
export type Category =
  | "Social Media Videos"
  | "Music Videos"
  | "Music Visuals"
  | "Graphic Pieces"
  | "Motion Graphics"
  | "Brand Content"
  | "Video Edits"
  | "Creative Experiments";

export type Aspect = "16:9" | "9:16" | "4:5" | "1:1" | "2.39:1";

/**
 * What opens when someone selects a project.
 * - mp4:     a file in /public (e.g. "/videos/projects/my-film.mp4") or any direct MP4 URL
 * - youtube: the video ID from youtube.com/watch?v=<ID>
 * - vimeo:   the numeric ID from vimeo.com/<ID>
 * - gallery: still pieces (covers, posters, carousels…) shown one by one
 */
export type VideoSource =
  | { type: "mp4"; src: string; poster?: string }
  | { type: "youtube"; id: string }
  | { type: "vimeo"; id: string; hash?: string };

export type GallerySource = {
  type: "gallery";
  images: { src: string; alt: L; aspect: Aspect; caption?: L }[];
};

export type ProjectMedia = VideoSource | GallerySource;

/**
 * How a project sits in the Selected Works grid (desktop).
 * feature   – full width, hero card
 * wide      – large card, left aligned (≈ 2/3 width)
 * wideRight – large card, right aligned
 * tall      – vertical 9:16 card next to a wide card
 * mid       – medium card, slightly inset
 * half      – half width (use two in a row)
 */
export type WorkLayout = "feature" | "wide" | "wideRight" | "tall" | "mid" | "half";

export type Project = {
  slug: string;
  title: L;
  category: Category;
  year: number;
  /** Type of work, e.g. { en: "Edit · Motion · Color", es: "Edición · Motion · Color" } */
  role: L;
  /** One or two sentences */
  description: L;
  /** Shape of the card in the grid */
  aspect: Aspect;
  layout: WorkLayout;
  /** Cover image shown in the grid (also used as the player poster) */
  cover: string;
  /** Optional short muted loop (3–6 s) that plays on hover / in view */
  preview?: string;
  media: ProjectMedia;
  /** Extra lines shown inside the player, e.g. { label: "Client", value: "..." } */
  details?: { label: L; value: L }[];
  /** true = placeholder content, shows a "Demo" tag. Set false for your real work. */
  demo?: boolean;
};

export type ArchiveItem = {
  id: string;
  title: L;
  kind: L;
  year: number;
  image: string;
  /** Optional muted loop */
  loop?: string;
  aspect: Aspect;
  alt: L;
};

export type Service = {
  title: L;
  description: L;
  /** Small technical note shown as a graphic detail */
  detail: L;
  glyph: "frame" | "timeline" | "brand" | "vertical" | "wave" | "wheel" | "poster" | "type";
  image: string;
};
