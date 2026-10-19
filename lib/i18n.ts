import type { Category } from "./types";

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** A value written once per language: { en: "...", es: "..." } */
export type L<T = string> = Record<Locale, T>;

export function tr<T>(value: L<T>, locale: Locale): T {
  return value[locale] ?? value[defaultLocale];
}

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Site-relative path of a locale's home page ("/" or "/es/"), without the deploy base path. */
export function localeRoute(locale: Locale) {
  return locale === defaultLocale ? "/" : `/${locale}/`;
}

/** Full href (with base path) of a locale's home page. */
export function localeHref(locale: Locale) {
  return `${BASE}${localeRoute(locale)}`;
}

export const localeNames: L = { en: "English", es: "Español" };
export const htmlLang: L = { en: "en", es: "es" };
export const ogLocale: L = { en: "en_US", es: "es_ES" };

export const categoryLabels: Record<Category, L> = {
  "Commercial Films": { en: "Commercial Films", es: "Publicidad" },
  "Brand Content": { en: "Brand Content", es: "Contenido de marca" },
  "Music Videos": { en: "Music Videos", es: "Videoclips" },
  "Social Media Films": { en: "Social Media Films", es: "Piezas para redes" },
  "Event Films": { en: "Event Films", es: "Films de eventos" },
  "Cinematic Edits": { en: "Cinematic Edits", es: "Edits cinematográficos" },
  "Creative Experiments": { en: "Creative Experiments", es: "Experimentos creativos" },
};

/** Headings with an italic serif accent: [before, accent, after] */
type Accent = [string, string, string];

/** Interface copy (labels, buttons, aria text). Content copy lives in site.config.ts. */
export const ui = {
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
    showreel: "Showreel",
    scroll: "Scroll",
    workLabel: "(01) Selected Works",
    workTitle: ["Selected", "works", ""] as Accent,
    workLead: "Films, edits and visual pieces built on intention, rhythm and emotion. Select a project to watch it.",
    categories: "Categories",
    projectsCount: (n: number) => `${n} projects`,
    demo: "Demo",
    demoNotice: "Placeholder projects with licensed stock footage — not client work.",
    playFilm: "Play film",
    viewProject: "View project",
    playAria: (title: string, cat: string, year: number) => `Play ${title} — ${cat}, ${year}`,
    selectedWorks: "Selected Works",
    year: "Year",
    work: "Work",
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
    aboutLabel: "(02) Behind the lens",
    aboutTitle: ["Behind", "the", "lens"] as Accent,
    vision: "Vision",
    approach: "Approach",
    principles: "Principles",
    portraitPlaceholder: "Portrait — placeholder",
    servicesLabel: "(03) Services",
    servicesTitle: ["What", "I", "make"] as Accent,
    servicesLead: "From the first frame to the final grade — one eye across camera, edit and color, so the film keeps a single voice.",
    archiveLabel: "(04) Visual playground",
    archiveTitle: ["Archive", "/ unclassified", ""] as Accent,
    archiveLead: "Personal edits, color and camera tests, motion studies and stills. Work without a client — where the language gets tested first.",
    archiveCount: (n: number) => `${n} entries`,
    archiveHint: "— scroll →",
    archiveAria: "Archive reel, scroll horizontally",
    contactLabel: "(05) Contact",
    startProject: "Start a project",
    mailSubject: "New project — HXNS",
    getInTouchOn: (c: string) => `Get in touch on ${c}`,
    contactPending: "Contact channels opening soon.",
    scenes: ["00 — Showreel", "01 — Selected works", "02 — Behind the lens", "03 — Services", "04 — Archive", "05 — Contact"],
    playCursor: "Play",
    backToTopLink: "Back to top ↑",
  },
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
    heroLabel: "Introducción",
    showreel: "Showreel",
    scroll: "Desliza",
    workLabel: "(01) Proyectos destacados",
    workTitle: ["Proyectos", "destacados", ""] as Accent,
    workLead: "Films, edits y piezas visuales construidas con intención, ritmo y emoción. Selecciona un proyecto para verlo.",
    categories: "Categorías",
    projectsCount: (n: number) => `${n} proyectos`,
    demo: "Demo",
    demoNotice: "Proyectos de muestra con metraje de stock con licencia — no son trabajos para clientes.",
    playFilm: "Ver film",
    viewProject: "Ver proyecto",
    playAria: (title: string, cat: string, year: number) => `Reproducir ${title} — ${cat}, ${year}`,
    selectedWorks: "Proyectos destacados",
    year: "Año",
    work: "Trabajo",
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
    aboutLabel: "(02) Detrás de la cámara",
    aboutTitle: ["Detrás", "de", "la cámara"] as Accent,
    vision: "Visión",
    approach: "Enfoque",
    principles: "Principios",
    portraitPlaceholder: "Retrato — marcador de posición",
    servicesLabel: "(03) Servicios",
    servicesTitle: ["Lo", "que", "hago"] as Accent,
    servicesLead: "Del primer fotograma al etalonaje final: una sola mirada en cámara, edición y color, para que el film mantenga una única voz.",
    archiveLabel: "(04) Laboratorio visual",
    archiveTitle: ["Archivo", "/ sin clasificar", ""] as Accent,
    archiveLead: "Edits personales, pruebas de color y de cámara, estudios de movimiento y fotografía. Trabajo sin cliente: donde el lenguaje se pone a prueba primero.",
    archiveCount: (n: number) => `${n} piezas`,
    archiveHint: "— desliza →",
    archiveAria: "Archivo, desplázate en horizontal",
    contactLabel: "(05) Contacto",
    startProject: "Empezar un proyecto",
    mailSubject: "Nuevo proyecto — HXNS",
    getInTouchOn: (c: string) => `Escríbeme por ${c}`,
    contactPending: "Canales de contacto disponibles muy pronto.",
    scenes: ["00 — Showreel", "01 — Proyectos destacados", "02 — Detrás de la cámara", "03 — Servicios", "04 — Archivo", "05 — Contacto"],
    playCursor: "Ver",
    backToTopLink: "Volver arriba ↑",
  },
};

export type UI = (typeof ui)["en"];
// Compile-time check: the Spanish dictionary must have exactly the same keys as English
ui.es satisfies UI;
