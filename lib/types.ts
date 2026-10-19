export type Category =
  | "Commercial Films"
  | "Brand Content"
  | "Music Videos"
  | "Social Media Films"
  | "Event Films"
  | "Cinematic Edits"
  | "Creative Experiments";

export type Aspect = "16:9" | "9:16" | "4:5" | "1:1" | "2.39:1";

/**
 * Where a project's full video lives.
 * - mp4:     a file in /public (e.g. "/videos/projects/my-film.mp4") or any direct MP4 URL
 * - youtube: the video ID from youtube.com/watch?v=<ID>
 * - vimeo:   the numeric ID from vimeo.com/<ID>
 */
export type VideoSource =
  | { type: "mp4"; src: string; poster?: string }
  | { type: "youtube"; id: string }
  | { type: "vimeo"; id: string; hash?: string };

/**
 * How a project sits in the Selected Works grid (desktop).
 * feature   – full width, cinematic hero card
 * wide      – large 16:9 card, left aligned (≈ 2/3 width)
 * wideRight – large 16:9 card, right aligned
 * tall      – vertical 9:16 card next to a wide card
 * mid       – medium card, slightly inset
 * half      – half width (use two in a row)
 */
export type WorkLayout = "feature" | "wide" | "wideRight" | "tall" | "mid" | "half";

export type Project = {
  slug: string;
  title: string;
  category: Category;
  year: number;
  /** Type of work, e.g. "Direction · Edit · Color" */
  role: string;
  /** One or two sentences */
  description: string;
  aspect: Aspect;
  layout: WorkLayout;
  /** Cover image shown in the grid (also used as the player poster) */
  cover: string;
  /** Optional short muted loop (3–6 s) that plays on hover / in view */
  preview?: string;
  video: VideoSource;
  /** Extra lines shown inside the player, e.g. { label: "Client", value: "..." } */
  details?: { label: string; value: string }[];
  /** true = placeholder footage, shows a "Demo" tag. Set false for your real work. */
  demo?: boolean;
};

export type ArchiveItem = {
  id: string;
  title: string;
  kind: string;
  year: number;
  image: string;
  /** Optional muted loop */
  loop?: string;
  aspect: Aspect;
  alt: string;
};

export type Service = {
  title: string;
  description: string;
  /** Small technical note shown as a graphic detail */
  detail: string;
  glyph: "frame" | "timeline" | "brand" | "vertical" | "wave" | "wheel";
  image: string;
};
