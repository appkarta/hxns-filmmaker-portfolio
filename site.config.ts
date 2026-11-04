/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  HXNS — central site configuration
 *  Copy for the hero, About, services and contact, plus contact details.
 *  Projects live in data/projects.ts.
 *  Text is written per language: { es: "Español", en: "English" }
 *  Spanish lives at /   ·   English lives at /en/
 *  Anything marked  TODO  is waiting for your real information.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import type { Service } from "@/lib/types";

export const person = {
  name: "York Hans",
  age: 21,
  city: "Barranquilla",
  region: "Atlántico",
  country: { es: "Colombia", en: "Colombia" },
  countryCode: "CO",
};

export const site = {
  name: "HXNS",
  concept: { es: "La identidad creativa de York Hans", en: "The creative identity of York Hans" },
  /** Public URL of the deployed site (used for SEO, sitemap and Open Graph) */
  url: "https://hxnss.co",
  title: {
    es: "York Hans | Filmmaker y editor de video en Barranquilla — HXNS",
    en: "York Hans | Filmmaker & Video Editor in Barranquilla — HXNS",
  },
  description: {
    es: "York Hans es filmmaker y editor de video en Barranquilla. Portafolio de HXNS: reels y contenido para redes, videos para marcas y empresas, y proyectos personales.",
    en: "York Hans is a filmmaker and video editor in Barranquilla, Colombia. The HXNS portfolio: reels and social content, videos for brands and companies, and personal projects.",
  },

  hero: {
    /** The one H1 of the page */
    h1: {
      es: "York Hans — Filmmaker y editor de video en Barranquilla",
      en: "York Hans — Filmmaker & video editor in Barranquilla",
    },
    headline: { es: ["Cada fotograma", "tiene algo que decir."], en: ["Every frame has", "something to say."] },
    roles: { es: "Filmmaker · Editor de video · Creativo visual", en: "Filmmaker · Video Editor · Visual Creative" },
    primaryCta: { es: "Explora mi trabajo", en: "Explore my work" },
    secondaryCta: { es: "Conóceme", en: "Get to know me" },
    video: {
      src: "/videos/hero/hxns-hero.mp4",
      poster: "/images/hero/hero-poster.webp",
      ambient: "/images/hero/hero-ambient.webp",
      label: { es: "20 segundos — HXNS", en: "20 seconds — HXNS" },
    },
  },

  /** Availability badge (hero, mobile menu and contact). Set `open: false` to hide it. */
  availability: {
    open: true, // TODO: confirm
    label: { es: "Disponible para nuevos proyectos", en: "Available for new projects" },
  },

  about: {
    photos: [
      {
        src: "/images/about/york-hans-02.webp",
        alt: {
          es: "Retrato en blanco y negro de York Hans con gafas de sol oscuras sobre fondo gris",
          en: "Black-and-white portrait of York Hans in dark sunglasses against a grey background",
        },
      },
      {
        src: "/images/about/york-hans-01.webp",
        alt: {
          es: "Retrato en blanco y negro de York Hans con gafas de sol sobre fondo blanco",
          en: "Black-and-white portrait of York Hans in sunglasses against a white background",
        },
      },
    ],
    intro: {
      es: "Soy York Hans, tengo 21 años y estoy construyendo mi camino detrás de una cámara y frente a una línea de tiempo.",
      en: "I'm York Hans. I'm 21, and I'm building my path behind a camera and in front of a timeline.",
    },
    paragraphs: [
      {
        es: "Me interesa todo lo que hace que una imagen se sienta distinta: una historia bien contada, un corte en el momento exacto, una canción, una luz o esos pequeños detalles que casi siempre pasan desapercibidos.",
        en: "I'm drawn to anything that makes an image feel different: a story told well, a cut at the exact moment, a song, a light, or the small details that usually go unnoticed.",
      },
      {
        es: "No tengo todas las respuestas y mi trabajo no está terminado. Espero que nunca lo esté. Lo que ves aquí es lo que hago hoy, y también el punto de partida de todo lo que quiero seguir aprendiendo y creando.",
        en: "I don't have all the answers, and my work isn't finished. I hope it never is. What you see here is what I make today — and the starting point for everything I still want to learn and create.",
      },
      {
        es: "HXNS es la forma en que reúno ese proceso. Trabajo desde Barranquilla, Colombia.",
        en: "HXNS is how I bring that process together. I work from Barranquilla, Colombia.",
      },
    ],
    focus: {
      es: "Filmmaking · Edición de video · Fotografía · Contenido visual",
      en: "Filmmaking · Video editing · Photography · Visual content",
    },
  },

  servicesLead: {
    es: "Desde Barranquilla hago video para marcas, empresas y proyectos personales: del rodaje a la edición final, pensado para el lugar donde se va a ver.",
    en: "From Barranquilla I make video for brands, companies and personal projects — from the shoot to the final edit, made for wherever it will be seen.",
  },

  contact: {
    headline: { es: ["Creemos algo", "que valga la pena ver."], en: ["Let's create something", "worth watching."] },
    text: {
      es: "¿Tienes una idea, una historia o un proyecto en mente? Hablemos.",
      en: "Have an idea, a story or a project in mind? Let's talk.",
    },
    /**
     * Contact form → Resend worker (see worker/README.md).
     * Can be overridden at build time with the CONTACT_ENDPOINT repository variable.
     */
    formEndpoint: "https://hxns-contact.hxnss-info.workers.dev",
    // TODO: fill in your real details. Empty values are hidden on the site.
    email: "",
    instagram: "", // e.g. "https://www.instagram.com/yourhandle"
    tiktok: "", // e.g. "https://www.tiktok.com/@yourhandle"
    vimeo: "", // e.g. "https://vimeo.com/yourhandle"
    youtube: "", // e.g. "https://www.youtube.com/@yourhandle"
  },

  nav: [
    { label: { es: "Trabajo", en: "Work" }, href: "#work" },
    { label: { es: "Sobre mí", en: "About" }, href: "#about" },
    { label: { es: "Contacto", en: "Contact" }, href: "#contact" },
  ],
};

/* ─────────────────────────────────────────────────────────────────────────────
 *  SERVICES (shown inside About)
 * ──────────────────────────────────────────────────────────────────────────── */
export const services: Service[] = [
  {
    title: { es: "Filmmaking y videografía", en: "Filmmaking & videography" },
    description: {
      es: "Rodaje para marcas, empresas y proyectos personales: encuadre, luz y movimiento al servicio de la historia.",
      en: "Shooting for brands, companies and personal projects: framing, light and movement in service of the story.",
    },
    detail: { es: "Encuadre / Luz / Movimiento", en: "Frame / Light / Movement" },
    glyph: "frame",
    image: "/images/projects/brands/axia-odontologia.webp",
  },
  {
    title: { es: "Edición de video y postproducción", en: "Video editing & post-production" },
    description: {
      es: "Estructura, ritmo, sonido y color. Del material en bruto a una pieza que se sostiene de principio a fin.",
      en: "Structure, pacing, sound and color. From raw footage to a piece that holds from start to finish.",
    },
    detail: { es: "Corte / Ritmo / Color", en: "Cut / Pace / Color" },
    glyph: "timeline",
    image: "/images/projects/personal/20-segundos-hxns.webp",
  },
  {
    title: { es: "Reels y contenido para redes", en: "Reels & social media content" },
    description: {
      es: "Videos verticales para Instagram, TikTok y Shorts, hechos para marcas y negocios que quieren comunicar con su propio estilo.",
      en: "Vertical videos for Instagram, TikTok and Shorts, made for brands and businesses that want to speak in their own style.",
    },
    detail: { es: "9:16 / Gancho / Ritmo", en: "9:16 / Hook / Pace" },
    glyph: "vertical",
    image: "/images/hero/hero-poster.webp",
  },
  {
    title: { es: "Videos para empresas y marcas", en: "Videos for companies & brands" },
    description: {
      es: "Contenido de marca, videos comerciales y corporativos que presentan un negocio con claridad y personalidad.",
      en: "Brand content, commercial and corporate videos that present a business with clarity and personality.",
    },
    detail: { es: "Marca / Comercial / Corporativo", en: "Brand / Commercial / Corporate" },
    glyph: "brand",
    image: "/images/projects/brands/axia-odontologia.webp",
  },
  {
    title: { es: "Fotografía", en: "Photography" },
    description: {
      es: "Retrato y fotografía para contenido visual de marcas, artistas y proyectos.",
      en: "Portrait and photography for the visual content of brands, artists and projects.",
    },
    detail: { es: "Retrato / Contenido / Editorial", en: "Portrait / Content / Editorial" },
    glyph: "camera",
    image: "/images/about/york-hans-01.webp",
  },
];
