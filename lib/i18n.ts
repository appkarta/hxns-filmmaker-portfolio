import type { WorkCategory } from "./types";

/** Spanish is the main language (served at "/"); English lives at "/en/". */
export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

/** A value written once per language: { es: "...", en: "..." } */
export type L<T = string> = Record<Locale, T>;

function isLocalized<T>(value: unknown): value is L<T> {
  return typeof value === "object" && value !== null && !Array.isArray(value) && "es" in value && "en" in value;
}

/** Picks the right language. Plain values (same in every language) pass through. */
export function tr<T>(value: L<T> | T, locale: Locale): T {
  if (isLocalized<T>(value)) return value[locale] ?? value[defaultLocale];
  return value;
}

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Site-relative path of a locale's home page ("/" or "/en/"), without the deploy base path. */
export function localeRoute(locale: Locale) {
  return locale === defaultLocale ? "/" : `/${locale}/`;
}

/** Full href (with base path) of a locale's home page. */
export function localeHref(locale: Locale) {
  return `${BASE}${localeRoute(locale)}`;
}

export const localeNames: L = { es: "Español", en: "English" };
export const htmlLang: L = { es: "es-CO", en: "en" };
export const ogLocale: L = { es: "es_CO", en: "en_US" };

/** The areas of the Work section, in the order they are listed. Only the ones with projects are shown. */
export const workCategories: { id: WorkCategory; label: L; description: L }[] = [
  {
    id: "vertical",
    label: { es: "Vertical", en: "Vertical" },
    description: {
      es: "Reels, TikToks y contenido corto pensado para la pantalla del móvil.",
      en: "Reels, TikToks and short-form content made for the phone screen.",
    },
  },
  {
    id: "horizontal",
    label: { es: "Horizontal", en: "Horizontal" },
    description: {
      es: "Piezas cinematográficas, videos comerciales y corporativos, storytelling y proyectos personales en 16:9 o más.",
      en: "Cinematic pieces, commercial and corporate videos, storytelling and personal films in 16:9 and wider.",
    },
  },
  {
    id: "brands",
    label: { es: "Marcas y comercial", en: "Brands & Commercial" },
    description: {
      es: "Trabajo hecho para marcas, negocios y clientes.",
      en: "Work made for brands, businesses and clients.",
    },
  },
  {
    id: "events",
    label: { es: "Artistas y eventos", en: "Artists & Events" },
    description: {
      es: "Conciertos, artistas en tarima y la energía de los eventos en vivo.",
      en: "Concerts, artists on stage and the energy of live events.",
    },
  },
  {
    id: "personal",
    label: { es: "Personal / Experimentos", en: "Personal / Experiments" },
    description: {
      es: "Piezas propias: estilo, pruebas, storytelling y edición sin brief.",
      en: "My own pieces: style, tests, storytelling and editing with no brief.",
    },
  },
];

/** Headings with an italic serif accent: [before, accent, after] */
type Accent = [string, string, string];

/** Interface copy (labels, buttons, aria text). Content lives in site.config.ts and data/projects.ts. */
export const ui = {
  es: {
    skip: "Saltar al contenido",
    backToTop: "volver arriba",
    letsTalk: "Hablemos",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    menu: "Menú",
    close: "Cerrar",
    language: "Idioma",
    primaryNav: "Principal",
    mobileNav: "Móvil",
    footerNav: "Pie de página",
    heroLabel: "Presentación",
    scroll: "Desliza",
    workLabel: "(01) Trabajo",
    workTitle: ["Mi", "trabajo", ""] as Accent,
    workLead: "Un archivo vivo: lo que estoy haciendo hoy, organizado por formato. Crece conmigo.",
    workNav: "Categorías de trabajo",
    projectsCount: (n: number) => `${n} ${n === 1 ? "proyecto" : "proyectos"}`,
    playFilm: "Reproducir",
    viewProject: "Ver proyecto",
    playAria: (title: string, cat: string) => `Reproducir ${title} — ${cat}`,
    viewPieces: "Ver piezas",
    viewPhoto: "Ver foto",
    selectedWorks: "Trabajo",
    client: "Cliente",
    category: "Categoría",
    role: "Rol",
    year: "Año",
    format: "Formato",
    previous: "Anterior",
    next: "Siguiente",
    projectNav: "Navegación entre proyectos",
    loadingVideo: "Cargando video",
    videoError: "No se pudo cargar el video.",
    retry: "Reintentar",
    play: "Reproducir",
    pause: "Pausar",
    mute: "Silenciar",
    unmute: "Activar sonido",
    fullscreen: "Pantalla completa",
    exitFullscreen: "Salir de pantalla completa",
    seek: "Buscar",
    seekText: (t: number, d: number) => `${t} de ${d} segundos`,
    videoSuffix: "video",
    piece: "Pieza",
    prevPiece: "Pieza anterior",
    nextPiece: "Pieza siguiente",
    soundOn: "Abre el proyecto para verlo con sonido",
    aboutLabel: "(02) Sobre mí",
    aboutTitle: ["York", "Hans", ""] as Accent,
    name: "Nombre",
    age: "Edad",
    basedIn: "Base",
    focus: "Enfoque",
    servicesLabel: "Servicios",
    servicesTitle: ["Lo", "que", "hago"] as Accent,
    contactLabel: "(03) Contacto",
    form: {
      title: "Cuéntame tu proyecto",
      name: "Nombre",
      email: "Correo",
      type: "¿Qué necesitas?",
      types: [
        "Contenido vertical (Reels, TikTok)",
        "Video para mi marca o empresa",
        "Video corporativo",
        "Edición de video",
        "Fotografía",
        "Proyecto personal o creativo",
        "Otra cosa",
      ],
      timing: "¿Para cuándo lo necesitas?",
      timings: ["Lo antes posible", "Este mes", "En 1–3 meses", "Solo estoy explorando"],
      optional: "opcional",
      message: "Mensaje",
      messagePlaceholder: "La idea, el formato, dónde se va a publicar, referencias…",
      send: "Enviar mensaje",
      sending: "Enviando…",
      success: "¡Gracias! Tu mensaje ya está en camino; te respondo pronto.",
      error: "Algo salió mal y el mensaje no se envió. Inténtalo de nuevo en un momento.",
      offline: "El formulario aún no está activo; lo estará muy pronto.",
      required: "Este campo es obligatorio.",
      invalidEmail: "Escribe un correo válido.",
      shortMessage: "Cuéntame un poco más (mínimo 10 caracteres).",
      shortName: "Escribe al menos 2 caracteres.",
      rateLimited: "Demasiados mensajes en poco tiempo. Espera un minuto y vuelve a intentarlo.",
      captcha: "Completa la verificación y vuelve a enviar.",
      privacy: "Tus datos solo se usan para responderte.",
      sendAnother: "Enviar otro mensaje",
    },
    scenes: ["00 — HXNS", "01 — Trabajo", "02 — Sobre mí", "03 — Contacto"],
    playCursor: "Ver",
    viewCursor: "Ver",
    backToTopLink: "Volver arriba ↑",
  },
  en: {
    skip: "Skip to content",
    backToTop: "back to top",
    letsTalk: "Let's talk",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menu: "Menu",
    close: "Close",
    language: "Language",
    primaryNav: "Primary",
    mobileNav: "Mobile",
    footerNav: "Footer",
    heroLabel: "Introduction",
    scroll: "Scroll",
    workLabel: "(01) Work",
    workTitle: ["My", "work", ""] as Accent,
    workLead: "A living archive: what I'm making today, organized by format. It grows as I do.",
    workNav: "Work categories",
    projectsCount: (n: number) => `${n} ${n === 1 ? "project" : "projects"}`,
    playFilm: "Play",
    viewProject: "View project",
    playAria: (title: string, cat: string) => `Play ${title} — ${cat}`,
    viewPieces: "View pieces",
    viewPhoto: "View photo",
    selectedWorks: "Work",
    client: "Client",
    category: "Category",
    role: "Role",
    year: "Year",
    format: "Format",
    previous: "Previous",
    next: "Next",
    projectNav: "Project navigation",
    loadingVideo: "Loading video",
    videoError: "This video couldn't be loaded.",
    retry: "Try again",
    play: "Play",
    pause: "Pause",
    mute: "Mute",
    unmute: "Unmute",
    fullscreen: "Fullscreen",
    exitFullscreen: "Exit fullscreen",
    seek: "Seek",
    seekText: (t: number, d: number) => `${t} of ${d} seconds`,
    videoSuffix: "video",
    piece: "Piece",
    prevPiece: "Previous piece",
    nextPiece: "Next piece",
    soundOn: "Open the project to watch it with sound",
    aboutLabel: "(02) About",
    aboutTitle: ["York", "Hans", ""] as Accent,
    name: "Name",
    age: "Age",
    basedIn: "Based in",
    focus: "Focus",
    servicesLabel: "Services",
    servicesTitle: ["What", "I", "do"] as Accent,
    contactLabel: "(03) Contact",
    form: {
      title: "Tell me about your project",
      name: "Name",
      email: "Email",
      type: "What do you need?",
      types: [
        "Vertical content (Reels, TikTok)",
        "Video for my brand or company",
        "Corporate video",
        "Video editing",
        "Photography",
        "Personal or creative project",
        "Something else",
      ],
      timing: "When do you need it?",
      timings: ["As soon as possible", "This month", "In 1–3 months", "Just exploring"],
      optional: "optional",
      message: "Message",
      messagePlaceholder: "The idea, the format, where it will be published, references…",
      send: "Send message",
      sending: "Sending…",
      success: "Thanks! Your message is on its way — I'll get back to you soon.",
      error: "Something went wrong and the message wasn't sent. Please try again in a moment.",
      offline: "The form isn't active yet — it will be very soon.",
      required: "This field is required.",
      invalidEmail: "Enter a valid email address.",
      shortMessage: "Tell me a little more (at least 10 characters).",
      shortName: "Enter at least 2 characters.",
      rateLimited: "Too many messages in a short time. Please wait a minute and try again.",
      captcha: "Please complete the verification and send again.",
      privacy: "Your details are only used to reply to you.",
      sendAnother: "Send another message",
    },
    scenes: ["00 — HXNS", "01 — Work", "02 — About", "03 — Contact"],
    playCursor: "Play",
    viewCursor: "View",
    backToTopLink: "Back to top ↑",
  },
};

export type UI = (typeof ui)["es"];
// Compile-time check: the English dictionary must have exactly the same keys as Spanish
ui.en satisfies UI;
