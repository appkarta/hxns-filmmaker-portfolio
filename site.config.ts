/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  HXNS — central site configuration
 *  Edit this file to change copy, contact details, projects, services and media.
 *  Every text is written in both languages:  { en: "English", es: "Español" }
 *  English lives at /   ·   Spanish lives at /es/
 *  Anything marked  TODO  is a placeholder waiting for your real information.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import type { ArchiveItem, Project, Service } from "@/lib/types";

export const site = {
  name: "HXNS",
  concept: { en: "Visual identity in motion", es: "Identidad visual en movimiento" },
  /** Public URL of the deployed site (used for SEO, sitemap and Open Graph) */
  url: "https://hxnss.co",
  title: {
    en: "HXNS® — Social Video, Music Visuals & Graphic Design",
    es: "HXNS® — Videos para redes, música y piezas gráficas",
  },
  description: {
    en: "HXNS creates social media videos, music videos and visuals, motion graphics and graphic pieces — edits and designs built on rhythm and emotion.",
    es: "HXNS crea videos para redes sociales, videoclips y visuales musicales, motion graphics y piezas gráficas: edición y diseño con ritmo y emoción.",
  },

  hero: {
    headline: { en: ["I turn moments", "into motion."], es: ["Convierto momentos", "en movimiento."] },
    subtitle: {
      en: "Social Video · Music Visuals · Graphic Design",
      es: "Videos para redes · Visuales musicales · Diseño gráfico",
    },
    primaryCta: { en: "Explore my work", es: "Explora mi trabajo" },
    secondaryCta: { en: "Start a project", es: "Cuéntame tu proyecto" },
    /** Small editorial labels around the hero. Leave a value empty to hide it. */
    meta: {
      specialty: { en: "Edit · Motion · Design", es: "Edición · Motion · Diseño" },
      // TODO: add your city / country, e.g. { en: "Based in Madrid, ES", es: "Desde Madrid, ES" }
      location: { en: "", es: "" },
    },
    video: {
      desktop: "/videos/hero/hero-reel.mp4",
      mobile: "/videos/hero/hero-reel-mobile.mp4",
      poster: "/images/stills/hero-poster.webp",
      posterMobile: "/images/stills/hero-poster-mobile.webp",
    },
  },

  /** Availability badge (hero, mobile menu and contact). Set `open: false` to hide it. */
  availability: {
    open: true, // TODO: confirm
    label: { en: "Available for new projects", es: "Disponible para nuevos proyectos" },
  },

  about: {
    // TODO: replace with your own portrait (4:5 works best)
    portrait: "/images/portraits/portrait-placeholder.webp",
    portraitAlt: {
      en: "Close-up of a camera lens in cold blue light — portrait placeholder",
      es: "Primer plano de un objetivo con luz azul fría — marcador de posición del retrato",
    },
    portraitIsPlaceholder: true,
    statement: {
      en: "I’m HXNS — a video editor and visual creator making content for social media, music and brands. I build every piece with intention, rhythm and emotion, at the intersection of editing, motion and graphic design.",
      es: "Soy HXNS: edito video y creo piezas visuales para redes sociales, música y marcas. Construyo cada pieza con intención, ritmo y emoción, en la intersección entre la edición, el motion y el diseño gráfico.",
    },
    // TODO: rewrite these two paragraphs in your own words
    vision: {
      en: "On a feed you have one second to make someone stop. I care about that first frame, the cut that lands on the beat and the detail that makes people watch it twice.",
      es: "En un feed tienes un segundo para que alguien se detenga. Me importan ese primer fotograma, el corte que cae justo en el beat y el detalle que hace que lo vean dos veces.",
    },
    approach: {
      en: "Every piece starts from the platform and the sound. Format, edit and design are planned together — vertical, square or wide — so each version feels native, not adapted.",
      es: "Cada pieza parte de la plataforma y del sonido. Formato, edición y diseño se planean juntos —vertical, cuadrado o panorámico— para que cada versión se sienta nativa, no adaptada.",
    },
    principles: [
      { en: "Intention", es: "Intención" },
      { en: "Rhythm", es: "Ritmo" },
      { en: "Emotion", es: "Emoción" },
    ],
    stills: [
      {
        src: "/images/stills/bts-edit.webp",
        alt: { en: "Editor working on a timeline in a red-lit edit suite", es: "Persona editando una línea de tiempo en una sala de edición con luz roja" },
        caption: { en: "Edit suite", es: "Sala de edición" },
      },
      {
        src: "/images/graphics/nocturne-poster.webp",
        alt: { en: "Release poster design with large NOCTURNE lettering in blue duotone", es: "Diseño de póster de lanzamiento con la palabra NOCTURNE en duotono azul" },
        caption: { en: "Release poster", es: "Póster de lanzamiento" },
      },
      {
        src: "/images/graphics/nocturne-cover.webp",
        alt: { en: "Square single artwork with the word Nocturne in italic serif", es: "Portada cuadrada de single con la palabra Nocturne en serif cursiva" },
        caption: { en: "Single artwork", es: "Portada de single" },
      },
      {
        src: "/images/projects/type-in-motion.webp",
        alt: { en: "Kinetic typography frame reading “on the BEAT.” over blue smoke", es: "Fotograma de tipografía animada con el texto “on the BEAT.” sobre humo azul" },
        caption: { en: "Motion type", es: "Tipografía en movimiento" },
      },
    ],
  },

  contact: {
    headline: { en: ["Have a story", "worth telling?"], es: ["¿Tienes una historia", "que merece contarse?"] },
    text: { en: "Let's create something that deserves to be seen.", es: "Creemos algo que merezca ser visto." },
    /**
     * Contact form → Resend. URL of the deployed worker (see worker/README.md),
     * Can be overridden at build time with the CONTACT_ENDPOINT repository variable.
     * If it is empty the form is shown but tells visitors it isn't active yet.
     */
    formEndpoint: "https://hxns-contact.hxnss-info.workers.dev",
    // TODO: fill in your real details. Empty values are hidden on the site.
    email: "",
    instagram: "", // e.g. "https://www.instagram.com/yourhandle"
    vimeo: "", // e.g. "https://vimeo.com/yourhandle"
    youtube: "", // e.g. "https://www.youtube.com/@yourhandle"
    tiktok: "", // e.g. "https://www.tiktok.com/@yourhandle"
  },

  nav: [
    { label: { en: "Work", es: "Trabajo" }, href: "#work" },
    { label: { en: "About", es: "Sobre mí" }, href: "#about" },
    { label: { en: "Services", es: "Servicios" }, href: "#services" },
    { label: { en: "Archive", es: "Archivo" }, href: "#archive" },
    { label: { en: "Contact", es: "Contacto" }, href: "#contact" },
  ],

  /** Credit for the demo footage currently on the site. Remove once you use your own media. */
  mediaCredit: {
    label: { en: "Demo footage: Mixkit (free license)", es: "Metraje de muestra: Mixkit (licencia gratuita)" },
    url: "https://mixkit.co/license/#videoFree",
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
 *  PROJECTS — Selected Works
 *  All current entries are DEMO placeholders (licensed stock footage and demo designs).
 *  Replace title / description / media with your real work and set demo: false.
 *  media can be an MP4, a YouTube ID, a Vimeo ID or a gallery of images (see lib/types.ts).
 * ──────────────────────────────────────────────────────────────────────────── */
export const projects: Project[] = [
  {
    slug: "nocturne",
    title: { en: "Nocturne", es: "Nocturne" },
    category: "Music Videos",
    year: 2026,
    role: { en: "Concept · Edit · Color", es: "Concepto · Edición · Color" },
    description: {
      en: "A single figure, one hard light and a body that writes the rhythm. Music video concept for a slow, dark track.",
      es: "Una sola figura, una luz dura y un cuerpo que escribe el ritmo. Concepto de videoclip para un tema lento y oscuro.",
    },
    aspect: "16:9",
    layout: "feature",
    cover: "/images/projects/nocturne.webp",
    preview: "/videos/projects/nocturne-preview.mp4",
    media: { type: "mp4", src: "/videos/projects/nocturne.mp4" },
    details: [{ label: { en: "Type", es: "Tipo" }, value: { en: "Concept / demo", es: "Concepto / demo" } }],
    demo: true,
  },
  {
    slug: "type-in-motion",
    title: { en: "Type in Motion", es: "Type in Motion" },
    category: "Motion Graphics",
    year: 2026,
    role: { en: "Motion design · Kinetic type", es: "Motion design · Tipografía animada" },
    description: {
      en: "Kinetic typography cut on the beat: titles, transitions and format frames for vertical, square and wide deliveries.",
      es: "Tipografía animada que corta en el beat: títulos, transiciones y marcos de formato para entregas verticales, cuadradas y panorámicas.",
    },
    aspect: "16:9",
    layout: "wide",
    cover: "/images/projects/type-in-motion.webp",
    preview: "/videos/projects/type-in-motion-preview.mp4",
    media: { type: "mp4", src: "/videos/projects/type-in-motion.mp4" },
    demo: true,
  },
  {
    slug: "signal",
    title: { en: "Signal", es: "Signal" },
    category: "Social Media Videos",
    year: 2026,
    role: { en: "Vertical edit · Color", es: "Edición vertical · Color" },
    description: {
      en: "Laser light and a single performer. Built for Reels and TikTok: strong first frame, clean loop, no wasted seconds.",
      es: "Luz láser y una sola figura en escena. Pensado para Reels y TikTok: primer fotograma potente, loop limpio y ningún segundo de más.",
    },
    aspect: "9:16",
    layout: "tall",
    cover: "/images/projects/signal.webp",
    preview: "/videos/projects/signal-preview.mp4",
    media: { type: "mp4", src: "/videos/projects/signal.mp4" },
    demo: true,
  },
  {
    slug: "nocturne-release-kit",
    title: { en: "Nocturne — Release Kit", es: "Nocturne — Kit de lanzamiento" },
    category: "Graphic Pieces",
    year: 2026,
    role: { en: "Artwork · Poster · Story", es: "Portada · Póster · Story" },
    description: {
      en: "The visual system for a single release: square artwork, a print-ready poster and a story template that all speak the same language.",
      es: "El sistema visual de un lanzamiento: portada cuadrada, póster listo para imprimir y plantilla de story que hablan el mismo idioma.",
    },
    aspect: "4:5",
    layout: "mid",
    cover: "/images/graphics/nocturne-poster.webp",
    media: {
      type: "gallery",
      images: [
        {
          src: "/images/graphics/nocturne-cover.webp",
          aspect: "1:1",
          alt: { en: "Square single artwork with the word Nocturne in italic serif over a blue duotone photo", es: "Portada cuadrada con la palabra Nocturne en serif cursiva sobre una foto en duotono azul" },
          caption: { en: "Single artwork · 1:1", es: "Portada del single · 1:1" },
        },
        {
          src: "/images/graphics/nocturne-poster.webp",
          aspect: "4:5",
          alt: { en: "Release poster with large NOCTURNE lettering, a framed photo and the words Out now", es: "Póster de lanzamiento con NOCTURNE en grande, una foto enmarcada y el texto Out now" },
          caption: { en: "Release poster · 4:5", es: "Póster de lanzamiento · 4:5" },
        },
        {
          src: "/images/graphics/nocturne-story.webp",
          aspect: "9:16",
          alt: { en: "Vertical story design announcing a new single with a Listen now button", es: "Diseño vertical de story que anuncia un nuevo single con un botón Listen now" },
          caption: { en: "Story template · 9:16", es: "Plantilla de story · 9:16" },
        },
      ],
    },
    demo: true,
  },
  {
    slug: "violet-hour",
    title: { en: "Violet Hour", es: "Violet Hour" },
    category: "Music Visuals",
    year: 2026,
    role: { en: "Visualizer · Canvas · Color", es: "Visualizer · Canvas · Color" },
    description: {
      en: "Neon, haze and movement cut for the vertical frame. A 9:16 visualizer and Spotify Canvas loop designed to live on the phone screen.",
      es: "Neón, bruma y movimiento editados para el formato vertical. Un visualizer 9:16 y un loop para Spotify Canvas pensados para la pantalla del móvil.",
    },
    aspect: "9:16",
    layout: "tall",
    cover: "/images/projects/violet-hour.webp",
    preview: "/videos/projects/violet-hour-preview.mp4",
    media: { type: "mp4", src: "/videos/projects/violet-hour.mp4" },
    demo: true,
  },
  {
    slug: "mass",
    title: { en: "Mass", es: "Mass" },
    category: "Brand Content",
    year: 2026,
    role: { en: "Event recap · Social cutdowns", es: "Resumen de evento · Versiones para redes" },
    description: {
      en: "Hands up, lights down. An event recap that cuts on the crowd’s energy, delivered as a main edit plus short versions for every platform.",
      es: "Manos arriba, luces abajo. Un resumen de evento que corta con la energía del público, entregado como pieza principal y versiones cortas para cada plataforma.",
    },
    aspect: "16:9",
    layout: "wideRight",
    cover: "/images/projects/mass.webp",
    preview: "/videos/projects/mass-preview.mp4",
    media: { type: "mp4", src: "/videos/projects/mass.mp4" },
    demo: true,
  },
  {
    slug: "second-hand",
    title: { en: "Second Hand", es: "Second Hand" },
    category: "Brand Content",
    year: 2026,
    role: { en: "Product video · Edit", es: "Video de producto · Edición" },
    description: {
      en: "Macro light on steel and glass. A short product video about precision, made to loop on social and in store.",
      es: "Luz macro sobre acero y cristal. Un video de producto breve sobre la precisión, hecho para funcionar en loop en redes y en tienda.",
    },
    aspect: "16:9",
    layout: "half",
    cover: "/images/projects/second-hand.webp",
    preview: "/videos/projects/second-hand-preview.mp4",
    media: { type: "mp4", src: "/videos/projects/second-hand.mp4" },
    demo: true,
  },
  {
    slug: "after-rain",
    title: { en: "After Rain", es: "After Rain" },
    category: "Video Edits",
    year: 2026,
    role: { en: "City edit · Color", es: "Edición urbana · Color" },
    description: {
      en: "Wet asphalt and reflected signs from two cities, cut as one night. A personal edit on rhythm and light.",
      es: "Asfalto mojado y letreros reflejados de dos ciudades, editados como una sola noche. Un edit personal sobre el ritmo y la luz.",
    },
    aspect: "16:9",
    layout: "half",
    cover: "/images/projects/after-rain.webp",
    preview: "/videos/projects/after-rain-preview.mp4",
    media: { type: "mp4", src: "/videos/projects/after-rain.mp4" },
    demo: true,
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
 *  SERVICES
 * ──────────────────────────────────────────────────────────────────────────── */
export const services: Service[] = [
  {
    title: { en: "Social Media Videos", es: "Videos para redes sociales" },
    description: {
      en: "Reels, TikToks and Shorts that stop the scroll: hooks in the first second, pacing for each platform, subtitles and clean loops.",
      es: "Reels, TikToks y Shorts que detienen el scroll: gancho en el primer segundo, ritmo para cada plataforma, subtítulos y loops limpios.",
    },
    detail: { en: "9:16 / Hook / Loop", es: "9:16 / Gancho / Loop" },
    glyph: "vertical",
    image: "/images/projects/signal.webp",
  },
  {
    title: { en: "Music Videos & Visualizers", es: "Videoclips y visualizers" },
    description: {
      en: "Music videos, visualizers, lyric videos and Spotify Canvas loops — visuals built around the track and its release.",
      es: "Videoclips, visualizers, lyric videos y loops para Spotify Canvas: visuales construidos alrededor del tema y su lanzamiento.",
    },
    detail: { en: "Beat / Visualizer / Canvas", es: "Beat / Visualizer / Canvas" },
    glyph: "wave",
    image: "/images/projects/violet-hour.webp",
  },
  {
    title: { en: "Graphic Pieces", es: "Piezas gráficas" },
    description: {
      en: "Single and album artwork, posters, flyers, carousels and story templates that give a release or a brand one visual language.",
      es: "Portadas de singles y álbumes, pósters, flyers, carruseles y plantillas de stories que dan a un lanzamiento o a una marca un mismo lenguaje visual.",
    },
    detail: { en: "Cover / Poster / Feed", es: "Portada / Póster / Feed" },
    glyph: "poster",
    image: "/images/graphics/nocturne-poster.webp",
  },
  {
    title: { en: "Motion Graphics", es: "Motion graphics" },
    description: {
      en: "Animated titles, kinetic typography, transitions and graphic packs that make videos feel designed, not just edited.",
      es: "Títulos animados, tipografía cinética, transiciones y paquetes gráficos para que los videos se sientan diseñados, no solo editados.",
    },
    detail: { en: "Type / Titles / Transitions", es: "Tipografía / Títulos / Transiciones" },
    glyph: "type",
    image: "/images/projects/type-in-motion.webp",
  },
  {
    title: { en: "Video Editing & Post-production", es: "Edición y postproducción" },
    description: {
      en: "Structure, pacing, sound and color for any format — from long edits to every short cutdown they need.",
      es: "Estructura, ritmo, sonido y color para cualquier formato: desde la pieza larga hasta todas las versiones cortas que necesite.",
    },
    detail: { en: "Cut / Sound / Color", es: "Corte / Sonido / Color" },
    glyph: "timeline",
    image: "/images/stills/bts-edit.webp",
  },
  {
    title: { en: "Brand & Event Content", es: "Contenido para marcas y eventos" },
    description: {
      en: "Campaign pieces, product videos and event recaps for brands and artists, delivered in every size each channel needs.",
      es: "Piezas de campaña, videos de producto y resúmenes de eventos para marcas y artistas, entregados en todos los tamaños que pide cada canal.",
    },
    detail: { en: "Campaign / Event / Formats", es: "Campaña / Evento / Formatos" },
    glyph: "brand",
    image: "/images/projects/second-hand.webp",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
 *  VISUAL PLAYGROUND / ARCHIVE — personal tests, color, motion, graphics, stills
 *  Demo placeholders. Replace with your own experiments.
 * ──────────────────────────────────────────────────────────────────────────── */
export const archive: ArchiveItem[] = [
  {
    id: "ARC-001",
    title: { en: "Red key", es: "Clave roja" },
    kind: { en: "Color test", es: "Prueba de color" },
    year: 2026,
    image: "/images/archive/arc-01.webp",
    loop: "/videos/archive/arc-01.mp4",
    aspect: "16:9",
    alt: { en: "Black silhouette of a dancer against a saturated red background", es: "Silueta negra de una figura bailando sobre un fondo rojo saturado" },
  },
  {
    id: "ARC-002",
    title: { en: "Mass — Live", es: "Mass — Live" },
    kind: { en: "Event poster", es: "Póster de evento" },
    year: 2026,
    image: "/images/graphics/mass-poster.webp",
    aspect: "4:5",
    alt: { en: "Event poster with huge MASS lettering over a blue-tinted concert crowd", es: "Póster de evento con MASS en grande sobre un público de concierto en azul" },
  },
  {
    id: "ARC-003",
    title: { en: "Smoke plate", es: "Placa de humo" },
    kind: { en: "Motion study", es: "Estudio de motion" },
    year: 2026,
    image: "/images/archive/arc-02.webp",
    loop: "/videos/archive/arc-02.mp4",
    aspect: "16:9",
    alt: { en: "White smoke curling over a black background", es: "Humo blanco ondulando sobre un fondo negro" },
  },
  {
    id: "ARC-004",
    title: { en: "Neon vertical", es: "Neón vertical" },
    kind: { en: "Photography", es: "Fotografía" },
    year: 2026,
    image: "/images/archive/arc-08.webp",
    aspect: "9:16",
    alt: { en: "Vertical neon signs with Japanese characters at night", es: "Letreros de neón verticales con caracteres japoneses de noche" },
  },
  {
    id: "ARC-005",
    title: { en: "Stop the scroll", es: "Stop the scroll" },
    kind: { en: "Carousel slide", es: "Carrusel" },
    year: 2026,
    image: "/images/graphics/stop-the-scroll.webp",
    aspect: "1:1",
    alt: { en: "Square carousel slide reading Stop the scroll with three tips and a blue-lit performer", es: "Diapositiva cuadrada de carrusel con el texto Stop the scroll, tres consejos y una figura iluminada en azul" },
  },
  {
    id: "ARC-006",
    title: { en: "Haze", es: "Bruma" },
    kind: { en: "Color test", es: "Prueba de color" },
    year: 2026,
    image: "/images/archive/arc-10.webp",
    loop: "/videos/archive/arc-10.mp4",
    aspect: "16:9",
    alt: { en: "Silhouette of a dancer in purple haze with blue light bars", es: "Silueta de una figura bailando entre bruma violeta y barras de luz azul" },
  },
  {
    id: "ARC-007",
    title: { en: "Shutter cycle", es: "Ciclo de obturador" },
    kind: { en: "Loop", es: "Loop" },
    year: 2026,
    image: "/images/archive/arc-04.webp",
    loop: "/videos/archive/arc-04.mp4",
    aspect: "16:9",
    alt: { en: "Close-up of a camera aperture opening and closing", es: "Primer plano del diafragma de una cámara abriéndose y cerrándose" },
  },
  {
    id: "ARC-008",
    title: { en: "Prism body", es: "Cuerpo prisma" },
    kind: { en: "Personal edit", es: "Edit personal" },
    year: 2026,
    image: "/images/archive/arc-12.webp",
    aspect: "9:16",
    alt: { en: "Silhouette of a dancer against vertical rainbow light", es: "Silueta de una figura bailando frente a franjas de luz arcoíris" },
  },
  {
    id: "ARC-009",
    title: { en: "Hotel", es: "Hotel" },
    kind: { en: "Photography", es: "Fotografía" },
    year: 2026,
    image: "/images/archive/arc-07.webp",
    aspect: "16:9",
    alt: { en: "Red neon hotel sign beside teal windows at night", es: "Letrero de neón rojo de un hotel junto a ventanas turquesa de noche" },
  },
  {
    id: "ARC-010",
    title: { en: "Mist plate", es: "Placa de niebla" },
    kind: { en: "Motion study", es: "Estudio de motion" },
    year: 2026,
    image: "/images/archive/arc-06.webp",
    loop: "/videos/archive/arc-06.mp4",
    aspect: "16:9",
    alt: { en: "Cold blue mist rolling across the frame", es: "Niebla azul fría atravesando el encuadre" },
  },
  {
    id: "ARC-011",
    title: { en: "Storm piano", es: "Piano en tormenta" },
    kind: { en: "Sequence", es: "Secuencia" },
    year: 2026,
    image: "/images/archive/arc-11.webp",
    aspect: "16:9",
    alt: { en: "Silhouette of a pianist under a stormy sky with flying debris", es: "Silueta de una persona tocando el piano bajo un cielo de tormenta" },
  },
  {
    id: "ARC-012",
    title: { en: "Glass", es: "Cristal" },
    kind: { en: "Camera test", es: "Prueba de cámara" },
    year: 2026,
    image: "/images/archive/arc-05.webp",
    aspect: "16:9",
    alt: { en: "Close-up of a camera lens with reflections", es: "Primer plano de un objetivo con reflejos" },
  },
];
