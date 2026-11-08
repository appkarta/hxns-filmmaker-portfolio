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
 *  Categories: "vertical" | "horizontal" | "brands" | "events" | "personal"
 *  A category only appears on the page once it has at least one project.
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
    quote: {
      es: "Del primer saludo a la última sonrisa: así se siente una cita en Axia.",
      en: "From the first handshake to the last smile: this is what a visit to Axia feels like.",
    },
    description: {
      es: "Contenido vertical para las redes de Axia Odontología. El paciente llega, se sienta y el procedimiento avanza en planos cerrados y ritmo ágil, hasta terminar riendo junto al doctor frente al logo de la clínica.",
      en: "Vertical social content for Axia Odontología. The patient arrives, takes the chair and the procedure moves forward in close shots and a quick pace, ending with a laugh next to the doctor in front of the clinic logo.",
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
      en: "York Hans in a hood at his blue-lit desk, looking down at his phone; on-screen text: “y las decisiones”",
    },
  },
  {
    id: "dj-en-cabina",
    title: { es: "DJ en cabina", en: "DJ in the booth" },
    category: "events",
    tag: { es: "Fotografía", en: "Photography" },
    // TODO: add the event, artist or year if you want them shown
    quote: {
      es: "La música no se ve. Pero se nota en las manos, en la luz y en la concentración.",
      en: "You can't see music. But you can see it in the hands, the light and the focus.",
    },
    description: {
      es: "Retrato en cabina bajo luces de escenario: el controlador, las manos y un DJ metido en su set. La misma mirada de los videos, en un solo fotograma.",
      en: "A booth portrait under stage lights: the decks, the hands and a DJ locked into the set. The same eye as the videos, in a single frame.",
    },
    mediaType: "image",
    media: "/images/projects/events/dj-en-cabina.webp",
    thumbnail: "/images/projects/events/dj-en-cabina.webp",
    aspect: "3:4",
    alt: {
      es: "DJ con gorra y gafas oscuras mezclando en un controlador Denon bajo luces de escenario verdes y amarillas",
      en: "DJ in a cap and dark glasses mixing on a Denon controller under green and yellow stage lights",
    },
  },
  {
    id: "en-vivo",
    title: { es: "En vivo", en: "Live" },
    category: "events",
    tag: { es: "Fotografía de conciertos", en: "Concert photography" },
    // TODO: add the events, cities or years if you want them shown
    quote: {
      es: "Desde el público, con la cámara arriba: lo que se vive en un show también se puede guardar en una foto.",
      en: "From the crowd, camera up: what you feel at a show can also live in a photo.",
    },
    description: {
      es: "Fotografía de conciertos: luces, humo, chispas y miles de pantallas encendidas. El Vega y Haffit en tarima.",
      en: "Concert photography: lights, smoke, sparks and thousands of phone screens lit up. El Vega and Haffit on stage.",
    },
    mediaType: "image",
    media: "/images/projects/events/en-vivo-el-vega.webp",
    gallery: ["/images/projects/events/en-vivo-haffit.webp", "/images/projects/events/en-vivo-el-vega-02.webp"],
    thumbnail: "/images/projects/events/en-vivo-el-vega.webp",
    aspect: "5:4",
    featured: true,
    alt: {
      es: "El Vega cantando agachado en tarima entre dos columnas de chispas, con luces azules y el público en primer plano",
      en: "El Vega singing crouched on stage between two columns of sparks, blue lights above and the crowd in the foreground",
    },
    galleryAlt: [
      {
        es: "Concierto de Haffit visto desde lo alto: tarima con luces verdes y naranjas, pantalla gigante con un personaje animado y un público enorme con celulares encendidos",
        en: "Haffit concert seen from above: stage with green and orange lights, a giant screen with an animated character and a huge crowd holding up lit phones",
      },
      {
        es: "El Vega cantando con el micrófono en alto entre humo y luces moradas",
        en: "El Vega singing with the mic raised among smoke and purple lights",
      },
    ],
  },
];
