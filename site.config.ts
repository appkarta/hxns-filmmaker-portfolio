/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  HXNS — central site configuration
 *  Edit this file to change copy, contact details, projects, services and media.
 *  Anything marked  TODO  is a placeholder waiting for your real information.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import type { ArchiveItem, Project, Service } from "@/lib/types";

export const site = {
  name: "HXNS",
  concept: "Cinematic Digital Identity",
  /** Public URL of the deployed site (used for SEO, sitemap and Open Graph) */
  url: "https://appkarta.github.io/hxns-filmmaker-portfolio",
  title: "HXNS® — Filmmaker & Video Editor",
  description:
    "HXNS is a filmmaker and video editor creating cinematic visuals, brand films and visual stories through motion, rhythm and emotion.",

  hero: {
    headline: ["I turn moments", "into motion."],
    subtitle: "Filmmaker · Video Editor · Visual Storytelling",
    primaryCta: "Explore my work",
    secondaryCta: "Let's work together",
    /** Small editorial labels around the hero. Leave a value empty to hide it. */
    meta: {
      specialty: "Film · Edit · Color",
      // TODO: add your city / country, e.g. "Based in Madrid, ES"
      location: "",
    },
    video: {
      desktop: "/videos/hero/hero-reel.mp4",
      mobile: "/videos/hero/hero-reel-mobile.mp4",
      poster: "/images/stills/hero-poster.webp",
      posterMobile: "/images/stills/hero-poster-mobile.webp",
    },
  },

  /** Availability badge (header, hero and contact). Set `open: false` to hide it. */
  availability: {
    open: true, // TODO: confirm
    label: "Available for new projects",
  },

  about: {
    // TODO: replace with your own portrait (4:5 works best)
    portrait: "/images/portraits/portrait-placeholder.webp",
    portraitAlt: "Close-up of a 35mm cinema lens in cold blue light — portrait placeholder",
    portraitIsPlaceholder: true,
    statement:
      "I’m HXNS — a filmmaker and video editor focused on creating visual stories with intention, rhythm and emotion. I work at the intersection of cinematography, editing and digital culture.",
    // TODO: rewrite these two paragraphs in your own words
    vision:
      "Cinema is not only what we see, it is how long we are allowed to look. I care about the frame, the pause before the cut and the feeling that stays after the image is gone.",
    approach:
      "Every project starts with listening. From there, image, sound and edit are designed together — so the rhythm of the piece is built from the first shot, not fixed at the end.",
    principles: ["Intention", "Rhythm", "Emotion"],
    stills: [
      { src: "/images/stills/bts-slate.webp", alt: "Clapperboard in front of a cinema camera, blue light", caption: "Slate — roll 04" },
      { src: "/images/stills/bts-edit.webp", alt: "Editor working on a timeline in a red-lit edit suite", caption: "Edit suite" },
      { src: "/images/stills/bts-film.webp", alt: "Filmmaker holding a vintage 8mm camera", caption: "Super 8 tests" },
      { src: "/images/stills/bts-camera.webp", alt: "Broadcast video camera on a tripod in a dark studio", caption: "On set" },
    ],
  },

  contact: {
    headline: ["Have a story", "worth telling?"],
    text: "Let's create something that deserves to be seen.",
    // TODO: fill in your real details. Empty values are hidden on the site.
    email: "",
    instagram: "", // e.g. "https://www.instagram.com/yourhandle"
    vimeo: "", // e.g. "https://vimeo.com/yourhandle"
    youtube: "", // e.g. "https://www.youtube.com/@yourhandle"
  },

  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Archive", href: "#archive" },
    { label: "Contact", href: "#contact" },
  ],

  /** Credit for the demo footage currently on the site. Remove once you use your own media. */
  mediaCredit: { label: "Demo footage: Mixkit (free license)", url: "https://mixkit.co/license/#videoFree" },
};

/* ─────────────────────────────────────────────────────────────────────────────
 *  PROJECTS — Selected Works
 *  All current entries are DEMO placeholders built from licensed stock footage.
 *  Replace title / description / media with your real work and set demo: false.
 *  Video can be a local MP4, a YouTube ID or a Vimeo ID (see lib/types.ts).
 * ──────────────────────────────────────────────────────────────────────────── */
export const projects: Project[] = [
  {
    slug: "nocturne",
    title: "Nocturne",
    category: "Music Videos",
    year: 2026,
    role: "Direction · Edit · Color",
    description: "A single figure, one hard light and a body that writes the rhythm. Concept piece for a slow, dark track.",
    aspect: "16:9",
    layout: "feature",
    cover: "/images/projects/nocturne.webp",
    preview: "/videos/projects/nocturne-preview.mp4",
    video: { type: "mp4", src: "/videos/projects/nocturne.mp4" },
    details: [{ label: "Format", value: "Concept / demo" }],
    demo: true,
  },
  {
    slug: "low-visibility",
    title: "Low Visibility",
    category: "Commercial Films",
    year: 2026,
    role: "Edit · Sound design · Color",
    description: "Fog, sodium lights and a tunnel that opens into daylight — an automotive-style spot built on tension and release.",
    aspect: "16:9",
    layout: "wide",
    cover: "/images/projects/low-visibility.webp",
    preview: "/videos/projects/low-visibility-preview.mp4",
    video: { type: "mp4", src: "/videos/projects/low-visibility.mp4" },
    demo: true,
  },
  {
    slug: "violet-hour",
    title: "Violet Hour",
    category: "Music Videos",
    year: 2026,
    role: "Vertical edit · Color",
    description: "Neon, haze and movement cut for the vertical frame. A 9:16 visualiser designed to live on the phone screen.",
    aspect: "9:16",
    layout: "tall",
    cover: "/images/projects/violet-hour.webp",
    preview: "/videos/projects/violet-hour-preview.mp4",
    video: { type: "mp4", src: "/videos/projects/violet-hour.mp4" },
    demo: true,
  },
  {
    slug: "second-hand",
    title: "Second Hand",
    category: "Brand Content",
    year: 2026,
    role: "Product film · Edit",
    description: "Macro light on steel and glass. A short product film about precision, made to loop on social and in store.",
    aspect: "16:9",
    layout: "mid",
    cover: "/images/projects/second-hand.webp",
    preview: "/videos/projects/second-hand-preview.mp4",
    video: { type: "mp4", src: "/videos/projects/second-hand.mp4" },
    demo: true,
  },
  {
    slug: "signal",
    title: "Signal",
    category: "Social Media Films",
    year: 2026,
    role: "Vertical film · Edit · Color",
    description: "Laser light and a single performer. Built for Reels and TikTok: strong first frame, clean loop, no wasted seconds.",
    aspect: "9:16",
    layout: "tall",
    cover: "/images/projects/signal.webp",
    preview: "/videos/projects/signal-preview.mp4",
    video: { type: "mp4", src: "/videos/projects/signal.mp4" },
    demo: true,
  },
  {
    slug: "mass",
    title: "Mass",
    category: "Event Films",
    year: 2026,
    role: "Event recap · Edit",
    description: "Hands up, lights down. An event recap that cuts on the crowd’s energy instead of the timetable.",
    aspect: "16:9",
    layout: "wideRight",
    cover: "/images/projects/mass.webp",
    preview: "/videos/projects/mass-preview.mp4",
    video: { type: "mp4", src: "/videos/projects/mass.mp4" },
    demo: true,
  },
  {
    slug: "dust-line",
    title: "Dust Line",
    category: "Cinematic Edits",
    year: 2026,
    role: "Aerial edit · Color",
    description: "One rider, one line across an empty desert. A study in scale, distance and the sound of nothing.",
    aspect: "16:9",
    layout: "half",
    cover: "/images/projects/dust-line.webp",
    preview: "/videos/projects/dust-line-preview.mp4",
    video: { type: "mp4", src: "/videos/projects/dust-line.mp4" },
    demo: true,
  },
  {
    slug: "after-rain",
    title: "After Rain",
    category: "Cinematic Edits",
    year: 2026,
    role: "City edit · Color",
    description: "Wet asphalt and reflected signs from two cities, cut as one night. A personal edit on light after the storm.",
    aspect: "16:9",
    layout: "half",
    cover: "/images/projects/after-rain.webp",
    preview: "/videos/projects/after-rain-preview.mp4",
    video: { type: "mp4", src: "/videos/projects/after-rain.mp4" },
    demo: true,
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
 *  SERVICES
 * ──────────────────────────────────────────────────────────────────────────── */
export const services: Service[] = [
  {
    title: "Filmmaking & Videography",
    description: "Concept, shooting and camera work with a cinematic eye — framing, light and movement designed for the story.",
    detail: "Frame / Light / Movement",
    glyph: "frame",
    image: "/images/stills/bts-camera.webp",
  },
  {
    title: "Video Editing & Post-production",
    description: "Structure, pacing and sound. The edit is where the story finds its rhythm — and where every second earns its place.",
    detail: "Cut / Pace / Sound",
    glyph: "timeline",
    image: "/images/stills/bts-edit.webp",
  },
  {
    title: "Commercial & Brand Films",
    description: "Films that make a brand feel like something, not just look like something. From short spots to brand stories.",
    detail: "Spot / Story / Identity",
    glyph: "brand",
    image: "/images/projects/second-hand.webp",
  },
  {
    title: "Social Media Content",
    description: "Vertical-first edits for Reels, TikTok and Shorts: strong first frames, clean loops and native pacing.",
    detail: "9:16 / Loop / Hook",
    glyph: "vertical",
    image: "/images/projects/signal.webp",
  },
  {
    title: "Music Videos & Creative Projects",
    description: "Visual worlds for artists and ideas — performance, concept and experimentation built around the music.",
    detail: "Beat / Image / Concept",
    glyph: "wave",
    image: "/images/projects/violet-hour.webp",
  },
  {
    title: "Color Grading & Visual Finishing",
    description: "A consistent look across every shot: grading, contrast and texture that give the film its final identity.",
    detail: "Grade / Contrast / Texture",
    glyph: "wheel",
    image: "/images/archive/arc-10.webp",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
 *  VISUAL PLAYGROUND / ARCHIVE — personal tests, color, camera, motion, stills
 *  Demo placeholders. Replace with your own experiments.
 * ──────────────────────────────────────────────────────────────────────────── */
export const archive: ArchiveItem[] = [
  { id: "ARC-001", title: "Red key", kind: "Color test", year: 2026, image: "/images/archive/arc-01.webp", loop: "/videos/archive/arc-01.mp4", aspect: "16:9", alt: "Black silhouette of a dancer against a saturated red background" },
  { id: "ARC-002", title: "Smoke plate", kind: "Motion study", year: 2026, image: "/images/archive/arc-02.webp", loop: "/videos/archive/arc-02.mp4", aspect: "16:9", alt: "White smoke curling over a black background" },
  { id: "ARC-003", title: "Neon vertical", kind: "Photography", year: 2026, image: "/images/archive/arc-08.webp", aspect: "9:16", alt: "Vertical neon signs with Japanese characters at night" },
  { id: "ARC-004", title: "Shutter cycle", kind: "Camera test", year: 2026, image: "/images/archive/arc-04.webp", loop: "/videos/archive/arc-04.mp4", aspect: "16:9", alt: "Close-up of a camera aperture opening and closing" },
  { id: "ARC-005", title: "Haze", kind: "Color test", year: 2026, image: "/images/archive/arc-10.webp", loop: "/videos/archive/arc-10.mp4", aspect: "16:9", alt: "Silhouette of a dancer in purple haze with blue light bars" },
  { id: "ARC-006", title: "35mm", kind: "Still life", year: 2026, image: "/images/archive/arc-03.webp", aspect: "16:9", alt: "Roll of 35mm film negative on a reflective surface" },
  { id: "ARC-007", title: "Storm piano", kind: "Sequence", year: 2026, image: "/images/archive/arc-11.webp", aspect: "16:9", alt: "Silhouette of a pianist under a stormy sky with flying debris" },
  { id: "ARC-008", title: "Prism body", kind: "Personal edit", year: 2026, image: "/images/archive/arc-12.webp", aspect: "9:16", alt: "Silhouette of a dancer against vertical rainbow light" },
  { id: "ARC-009", title: "Hotel", kind: "Photography", year: 2026, image: "/images/archive/arc-07.webp", aspect: "16:9", alt: "Red neon hotel sign beside teal windows at night" },
  { id: "ARC-010", title: "Mist plate", kind: "Motion study", year: 2026, image: "/images/archive/arc-06.webp", loop: "/videos/archive/arc-06.mp4", aspect: "16:9", alt: "Soft white mist rolling across the frame" },
  { id: "ARC-011", title: "Glass", kind: "Camera test", year: 2026, image: "/images/archive/arc-05.webp", aspect: "16:9", alt: "Close-up of a camera lens with reflections" },
  { id: "ARC-012", title: "Grey room", kind: "Movement study", year: 2026, image: "/images/archive/arc-09.webp", aspect: "16:9", alt: "Dancer moving in a grey, foggy room" },
];
