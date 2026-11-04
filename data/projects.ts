/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  HXNS — PROJECTS
 *  The only file to edit when you add, change or remove work.
 *
 *  Add a project:
 *   1. Put the files in /public (or run `npm run media -- <file> <category> <id>`):
 *        public/videos/<category>/<id>.mp4            ← the video
 *        public/videos/<category>/<id>-preview.mp4    ← optional 3–6 s muted loop
 *        public/images/projects/<category>/<id>.webp  ← cover / poster
 *   2. Copy one of the entries below, change the fields and save.
 *   3. Commit and push → the site updates itself.
 *
 *  Text can be one string (same in both languages) or { es: "…", en: "…" }.
 *  Leave out any field you don't have yet — it simply won't be shown.
 *  Categories: "vertical" | "horizontal" | "brands" | "personal"
 * ─────────────────────────────────────────────────────────────────────────────
 */
import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "axia-odontologia",
    title: "Axia Odontología",
    category: "brands",
    client: "Axia Odontología",
    tag: "Brand Content / Social Media",
    // TODO: add the year, your role and a short description when you want them shown
    // year: "2026",
    // role: { es: "Rodaje y edición", en: "Shooting & edit" },
    description: {
      es: "Video vertical de marca para Axia Odontología.",
      en: "Vertical brand video for Axia Odontología.",
    },
    mediaType: "video",
    media: "/videos/brands/axia-odontologia.mp4",
    thumbnail: "/images/projects/brands/axia-odontologia.webp",
    preview: "/videos/brands/axia-odontologia-preview.mp4",
    aspect: "9:16",
    featured: true,
    alt: {
      es: "Odontólogo con lupas y careta trabajando en una consulta de Axia Odontología",
      en: "Dentist wearing loupes and a face shield at work in an Axia Odontología clinic",
    },
  },
  {
    id: "20-segundos",
    title: { es: "20 segundos", en: "20 seconds" },
    category: "personal",
    tag: { es: "Proyecto personal", en: "Personal project" },
    quote: {
      es: "Este video puede durar 20 segundos. Pero esos 20 segundos no cuentan toda la historia.",
      en: "This video may only last 20 seconds. But those 20 seconds don't tell the whole story.",
    },
    description: {
      es: "Una pieza personal sobre lo que no se ve: 20 segundos en pantalla, muchas decisiones detrás.",
      en: "A personal piece about what you don't see: 20 seconds on screen, many decisions behind them.",
    },
    mediaType: "video",
    media: "/videos/personal/20-segundos-hxns.mp4",
    thumbnail: "/images/projects/personal/20-segundos-hxns.webp",
    preview: "/videos/personal/20-segundos-hxns-preview.mp4",
    aspect: "9:16",
    featured: true,
    alt: {
      es: "York Hans hablando a cámara en su estación de edición con luz azul; texto en pantalla: «20 segundos»",
      en: "York Hans talking to camera at his blue-lit editing desk; on-screen text: “20 segundos”",
    },
  },
];
