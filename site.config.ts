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
  concept: { en: "Cinematic Digital Identity", es: "Identidad digital cinematográfica" },
  /** Public URL of the deployed site (used for SEO, sitemap and Open Graph) */
  url: "https://appkarta.github.io/hxns-filmmaker-portfolio",
  title: { en: "HXNS® — Filmmaker & Video Editor", es: "HXNS® — Cine y edición de video" },
  description: {
    en: "HXNS is a filmmaker and video editor creating cinematic visuals, brand films and visual stories through motion, rhythm and emotion.",
    es: "HXNS hace cine y edición de video: visuales cinematográficos, films de marca e historias visuales a través del movimiento, el ritmo y la emoción.",
  },

  hero: {
    headline: { en: ["I turn moments", "into motion."], es: ["Convierto momentos", "en movimiento."] },
    subtitle: {
      en: "Filmmaker · Video Editor · Visual Storytelling",
      es: "Cine · Edición de video · Narrativa visual",
    },
    primaryCta: { en: "Explore my work", es: "Explora mi trabajo" },
    secondaryCta: { en: "Let's work together", es: "Cuéntame tu proyecto" },
    /** Small editorial labels around the hero. Leave a value empty to hide it. */
    meta: {
      specialty: { en: "Film · Edit · Color", es: "Cine · Edición · Color" },
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

  /** Availability badge (header, hero and contact). Set `open: false` to hide it. */
  availability: {
    open: true, // TODO: confirm
    label: { en: "Available for new projects", es: "Disponible para nuevos proyectos" },
  },

  about: {
    // TODO: replace with your own portrait (4:5 works best)
    portrait: "/images/portraits/portrait-placeholder.webp",
    portraitAlt: {
      en: "Close-up of a 35mm cinema lens in cold blue light — portrait placeholder",
      es: "Primer plano de un objetivo de cine de 35 mm con luz azul fría — marcador de posición del retrato",
    },
    portraitIsPlaceholder: true,
    statement: {
      en: "I’m HXNS — a filmmaker and video editor focused on creating visual stories with intention, rhythm and emotion. I work at the intersection of cinematography, editing and digital culture.",
      es: "Soy HXNS: hago cine y edición de video para crear historias visuales con intención, ritmo y emoción. Trabajo en la intersección entre la cinematografía, la edición y la cultura digital.",
    },
    // TODO: rewrite these two paragraphs in your own words
    vision: {
      en: "Cinema is not only what we see, it is how long we are allowed to look. I care about the frame, the pause before the cut and the feeling that stays after the image is gone.",
      es: "El cine no es solo lo que vemos, sino cuánto tiempo se nos permite mirar. Me importan el encuadre, la pausa antes del corte y la sensación que queda cuando la imagen ya se ha ido.",
    },
    approach: {
      en: "Every project starts with listening. From there, image, sound and edit are designed together — so the rhythm of the piece is built from the first shot, not fixed at the end.",
      es: "Cada proyecto empieza escuchando. A partir de ahí, imagen, sonido y edición se diseñan juntos, para que el ritmo de la pieza se construya desde el primer plano y no se arregle al final.",
    },
    principles: [
      { en: "Intention", es: "Intención" },
      { en: "Rhythm", es: "Ritmo" },
      { en: "Emotion", es: "Emoción" },
    ],
    stills: [
      {
        src: "/images/stills/bts-slate.webp",
        alt: { en: "Clapperboard in front of a cinema camera, blue light", es: "Claqueta delante de una cámara de cine, luz azul" },
        caption: { en: "Slate — roll 04", es: "Claqueta — rollo 04" },
      },
      {
        src: "/images/stills/bts-edit.webp",
        alt: { en: "Editor working on a timeline in a red-lit edit suite", es: "Persona editando una línea de tiempo en una sala de edición con luz roja" },
        caption: { en: "Edit suite", es: "Sala de edición" },
      },
      {
        src: "/images/stills/bts-film.webp",
        alt: { en: "Filmmaker holding a vintage 8mm camera", es: "Persona filmando con una cámara vintage de 8 mm" },
        caption: { en: "Super 8 tests", es: "Pruebas en Super 8" },
      },
      {
        src: "/images/stills/bts-camera.webp",
        alt: { en: "Broadcast video camera on a tripod in a dark studio", es: "Cámara de video profesional sobre trípode en un estudio oscuro" },
        caption: { en: "On set", es: "En rodaje" },
      },
    ],
  },

  contact: {
    headline: { en: ["Have a story", "worth telling?"], es: ["¿Tienes una historia", "que merece contarse?"] },
    text: { en: "Let's create something that deserves to be seen.", es: "Creemos algo que merezca ser visto." },
    // TODO: fill in your real details. Empty values are hidden on the site.
    email: "",
    instagram: "", // e.g. "https://www.instagram.com/yourhandle"
    vimeo: "", // e.g. "https://vimeo.com/yourhandle"
    youtube: "", // e.g. "https://www.youtube.com/@yourhandle"
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
 *  All current entries are DEMO placeholders built from licensed stock footage.
 *  Replace title / description / media with your real work and set demo: false.
 *  Video can be a local MP4, a YouTube ID or a Vimeo ID (see lib/types.ts).
 * ──────────────────────────────────────────────────────────────────────────── */
export const projects: Project[] = [
  {
    slug: "nocturne",
    title: { en: "Nocturne", es: "Nocturne" },
    category: "Music Videos",
    year: 2026,
    role: { en: "Direction · Edit · Color", es: "Dirección · Edición · Color" },
    description: {
      en: "A single figure, one hard light and a body that writes the rhythm. Concept piece for a slow, dark track.",
      es: "Una sola figura, una luz dura y un cuerpo que escribe el ritmo. Pieza conceptual para un tema lento y oscuro.",
    },
    aspect: "16:9",
    layout: "feature",
    cover: "/images/projects/nocturne.webp",
    preview: "/videos/projects/nocturne-preview.mp4",
    video: { type: "mp4", src: "/videos/projects/nocturne.mp4" },
    details: [{ label: { en: "Type", es: "Tipo" }, value: { en: "Concept / demo", es: "Concepto / demo" } }],
    demo: true,
  },
  {
    slug: "low-visibility",
    title: { en: "Low Visibility", es: "Low Visibility" },
    category: "Commercial Films",
    year: 2026,
    role: { en: "Edit · Sound design · Color", es: "Edición · Diseño sonoro · Color" },
    description: {
      en: "Fog, sodium lights and a tunnel that opens into daylight — an automotive-style spot built on tension and release.",
      es: "Niebla, farolas de sodio y un túnel que se abre a la luz del día: un spot de estilo automovilístico construido sobre la tensión y la liberación.",
    },
    aspect: "16:9",
    layout: "wide",
    cover: "/images/projects/low-visibility.webp",
    preview: "/videos/projects/low-visibility-preview.mp4",
    video: { type: "mp4", src: "/videos/projects/low-visibility.mp4" },
    demo: true,
  },
  {
    slug: "violet-hour",
    title: { en: "Violet Hour", es: "Violet Hour" },
    category: "Music Videos",
    year: 2026,
    role: { en: "Vertical edit · Color", es: "Edición vertical · Color" },
    description: {
      en: "Neon, haze and movement cut for the vertical frame. A 9:16 visualiser designed to live on the phone screen.",
      es: "Neón, bruma y movimiento editados para el formato vertical. Un visualizer 9:16 pensado para vivir en la pantalla del móvil.",
    },
    aspect: "9:16",
    layout: "tall",
    cover: "/images/projects/violet-hour.webp",
    preview: "/videos/projects/violet-hour-preview.mp4",
    video: { type: "mp4", src: "/videos/projects/violet-hour.mp4" },
    demo: true,
  },
  {
    slug: "second-hand",
    title: { en: "Second Hand", es: "Second Hand" },
    category: "Brand Content",
    year: 2026,
    role: { en: "Product film · Edit", es: "Film de producto · Edición" },
    description: {
      en: "Macro light on steel and glass. A short product film about precision, made to loop on social and in store.",
      es: "Luz macro sobre acero y cristal. Un film de producto breve sobre la precisión, hecho para funcionar en loop en redes y en tienda.",
    },
    aspect: "16:9",
    layout: "mid",
    cover: "/images/projects/second-hand.webp",
    preview: "/videos/projects/second-hand-preview.mp4",
    video: { type: "mp4", src: "/videos/projects/second-hand.mp4" },
    demo: true,
  },
  {
    slug: "signal",
    title: { en: "Signal", es: "Signal" },
    category: "Social Media Films",
    year: 2026,
    role: { en: "Vertical film · Edit · Color", es: "Film vertical · Edición · Color" },
    description: {
      en: "Laser light and a single performer. Built for Reels and TikTok: strong first frame, clean loop, no wasted seconds.",
      es: "Luz láser y una sola figura en escena. Pensado para Reels y TikTok: primer fotograma potente, loop limpio y ningún segundo de más.",
    },
    aspect: "9:16",
    layout: "tall",
    cover: "/images/projects/signal.webp",
    preview: "/videos/projects/signal-preview.mp4",
    video: { type: "mp4", src: "/videos/projects/signal.mp4" },
    demo: true,
  },
  {
    slug: "mass",
    title: { en: "Mass", es: "Mass" },
    category: "Event Films",
    year: 2026,
    role: { en: "Event recap · Edit", es: "Resumen de evento · Edición" },
    description: {
      en: "Hands up, lights down. An event recap that cuts on the crowd’s energy instead of the timetable.",
      es: "Manos arriba, luces abajo. Un resumen de evento que corta con la energía del público, no con el horario.",
    },
    aspect: "16:9",
    layout: "wideRight",
    cover: "/images/projects/mass.webp",
    preview: "/videos/projects/mass-preview.mp4",
    video: { type: "mp4", src: "/videos/projects/mass.mp4" },
    demo: true,
  },
  {
    slug: "dust-line",
    title: { en: "Dust Line", es: "Dust Line" },
    category: "Cinematic Edits",
    year: 2026,
    role: { en: "Aerial edit · Color", es: "Edición aérea · Color" },
    description: {
      en: "One rider, one line across an empty desert. A study in scale, distance and the sound of nothing.",
      es: "Una moto, una línea a través de un desierto vacío. Un estudio sobre la escala, la distancia y el sonido de la nada.",
    },
    aspect: "16:9",
    layout: "half",
    cover: "/images/projects/dust-line.webp",
    preview: "/videos/projects/dust-line-preview.mp4",
    video: { type: "mp4", src: "/videos/projects/dust-line.mp4" },
    demo: true,
  },
  {
    slug: "after-rain",
    title: { en: "After Rain", es: "After Rain" },
    category: "Cinematic Edits",
    year: 2026,
    role: { en: "City edit · Color", es: "Edición urbana · Color" },
    description: {
      en: "Wet asphalt and reflected signs from two cities, cut as one night. A personal edit on light after the storm.",
      es: "Asfalto mojado y letreros reflejados de dos ciudades, editados como una sola noche. Un edit personal sobre la luz después de la tormenta.",
    },
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
    title: { en: "Filmmaking & Videography", es: "Cine y videografía" },
    description: {
      en: "Concept, shooting and camera work with a cinematic eye — framing, light and movement designed for the story.",
      es: "Concepto, rodaje y cámara con mirada cinematográfica: encuadre, luz y movimiento al servicio de la historia.",
    },
    detail: { en: "Frame / Light / Movement", es: "Encuadre / Luz / Movimiento" },
    glyph: "frame",
    image: "/images/stills/bts-camera.webp",
  },
  {
    title: { en: "Video Editing & Post-production", es: "Edición y postproducción" },
    description: {
      en: "Structure, pacing and sound. The edit is where the story finds its rhythm — and where every second earns its place.",
      es: "Estructura, ritmo y sonido. En la edición la historia encuentra su ritmo y cada segundo se gana su lugar.",
    },
    detail: { en: "Cut / Pace / Sound", es: "Corte / Ritmo / Sonido" },
    glyph: "timeline",
    image: "/images/stills/bts-edit.webp",
  },
  {
    title: { en: "Commercial & Brand Films", es: "Publicidad y films de marca" },
    description: {
      en: "Films that make a brand feel like something, not just look like something. From short spots to brand stories.",
      es: "Piezas que hacen que una marca se sienta, no solo que se vea. Desde spots breves hasta historias de marca.",
    },
    detail: { en: "Spot / Story / Identity", es: "Spot / Historia / Identidad" },
    glyph: "brand",
    image: "/images/projects/second-hand.webp",
  },
  {
    title: { en: "Social Media Content", es: "Contenido para redes sociales" },
    description: {
      en: "Vertical-first edits for Reels, TikTok and Shorts: strong first frames, clean loops and native pacing.",
      es: "Edits pensados en vertical para Reels, TikTok y Shorts: primeros fotogramas potentes, loops limpios y ritmo nativo.",
    },
    detail: { en: "9:16 / Loop / Hook", es: "9:16 / Loop / Gancho" },
    glyph: "vertical",
    image: "/images/projects/signal.webp",
  },
  {
    title: { en: "Music Videos & Creative Projects", es: "Videoclips y proyectos creativos" },
    description: {
      en: "Visual worlds for artists and ideas — performance, concept and experimentation built around the music.",
      es: "Mundos visuales para artistas e ideas: performance, concepto y experimentación construidos alrededor de la música.",
    },
    detail: { en: "Beat / Image / Concept", es: "Beat / Imagen / Concepto" },
    glyph: "wave",
    image: "/images/projects/violet-hour.webp",
  },
  {
    title: { en: "Color Grading & Visual Finishing", es: "Etalonaje y acabado visual" },
    description: {
      en: "A consistent look across every shot: grading, contrast and texture that give the film its final identity.",
      es: "Un look coherente en cada plano: color, contraste y textura que dan al film su identidad final.",
    },
    detail: { en: "Grade / Contrast / Texture", es: "Color / Contraste / Textura" },
    glyph: "wheel",
    image: "/images/archive/arc-10.webp",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
 *  VISUAL PLAYGROUND / ARCHIVE — personal tests, color, camera, motion, stills
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
    title: { en: "Smoke plate", es: "Placa de humo" },
    kind: { en: "Motion study", es: "Estudio de motion" },
    year: 2026,
    image: "/images/archive/arc-02.webp",
    loop: "/videos/archive/arc-02.mp4",
    aspect: "16:9",
    alt: { en: "White smoke curling over a black background", es: "Humo blanco ondulando sobre un fondo negro" },
  },
  {
    id: "ARC-003",
    title: { en: "Neon vertical", es: "Neón vertical" },
    kind: { en: "Photography", es: "Fotografía" },
    year: 2026,
    image: "/images/archive/arc-08.webp",
    aspect: "9:16",
    alt: { en: "Vertical neon signs with Japanese characters at night", es: "Letreros de neón verticales con caracteres japoneses de noche" },
  },
  {
    id: "ARC-004",
    title: { en: "Shutter cycle", es: "Ciclo de obturador" },
    kind: { en: "Camera test", es: "Prueba de cámara" },
    year: 2026,
    image: "/images/archive/arc-04.webp",
    loop: "/videos/archive/arc-04.mp4",
    aspect: "16:9",
    alt: { en: "Close-up of a camera aperture opening and closing", es: "Primer plano del diafragma de una cámara abriéndose y cerrándose" },
  },
  {
    id: "ARC-005",
    title: { en: "Haze", es: "Bruma" },
    kind: { en: "Color test", es: "Prueba de color" },
    year: 2026,
    image: "/images/archive/arc-10.webp",
    loop: "/videos/archive/arc-10.mp4",
    aspect: "16:9",
    alt: { en: "Silhouette of a dancer in purple haze with blue light bars", es: "Silueta de una figura bailando entre bruma violeta y barras de luz azul" },
  },
  {
    id: "ARC-006",
    title: { en: "35mm", es: "35 mm" },
    kind: { en: "Still life", es: "Bodegón" },
    year: 2026,
    image: "/images/archive/arc-03.webp",
    aspect: "16:9",
    alt: { en: "Roll of 35mm film negative on a reflective surface", es: "Rollo de negativo de 35 mm sobre una superficie reflectante" },
  },
  {
    id: "ARC-007",
    title: { en: "Storm piano", es: "Piano en tormenta" },
    kind: { en: "Sequence", es: "Secuencia" },
    year: 2026,
    image: "/images/archive/arc-11.webp",
    aspect: "16:9",
    alt: { en: "Silhouette of a pianist under a stormy sky with flying debris", es: "Silueta de una persona tocando el piano bajo un cielo de tormenta" },
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
    title: { en: "Glass", es: "Cristal" },
    kind: { en: "Camera test", es: "Prueba de cámara" },
    year: 2026,
    image: "/images/archive/arc-05.webp",
    aspect: "16:9",
    alt: { en: "Close-up of a camera lens with reflections", es: "Primer plano de un objetivo con reflejos" },
  },
  {
    id: "ARC-012",
    title: { en: "Grey room", es: "Sala gris" },
    kind: { en: "Movement study", es: "Estudio de movimiento" },
    year: 2026,
    image: "/images/archive/arc-09.webp",
    aspect: "16:9",
    alt: { en: "Dancer moving in a grey, foggy room", es: "Figura bailando en una sala gris con niebla" },
  },
];
