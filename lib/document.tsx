import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { site } from "@/site.config";
import { htmlLang, localeRoute, locales, ogLocale, tr, type Locale } from "./i18n";
import "@/app/globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const fontClasses = `${geist.variable} ${geistMono.variable} ${instrument.variable}`;

/**
 * Content-Security-Policy for the static site (GitHub Pages can't send headers, so it's a <meta>).
 * Scripts and styles must allow 'unsafe-inline' because the static export inlines Next.js bootstrap data;
 * everything else is locked to this origin, the contact worker, YouTube/Vimeo embeds and (optional) Turnstile.
 */
function contentSecurityPolicy() {
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || site.contact.formEndpoint;
  let workerOrigin = "";
  try {
    workerOrigin = endpoint ? new URL(endpoint).origin : "";
  } catch {
    /* invalid URL → no extra origin */
  }
  const turnstile = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? "https://challenges.cloudflare.com" : "";
  const join = (...v: string[]) => v.filter(Boolean).join(" ");
  return [
    "default-src 'self'",
    `script-src ${join("'self'", "'unsafe-inline'", turnstile)}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "media-src 'self' blob: https:",
    "font-src 'self' data:",
    `connect-src ${join("'self'", workerOrigin, turnstile)}`,
    `frame-src ${join("https://www.youtube-nocookie.com", "https://player.vimeo.com", turnstile)}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
}

export const securityMeta =
  process.env.NODE_ENV === "production" ? <meta httpEquiv="Content-Security-Policy" content={contentSecurityPolicy()} /> : null;

/** <html>/<body> shell shared by the English and Spanish root layouts. */
export function RootDocument({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html lang={htmlLang[locale]} className={fontClasses}>
      {/* App Router root layout: a plain <head> is the supported way to add tags (this rule targets the Pages Router) */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>{securityMeta}</head>
      <body>{children}</body>
    </html>
  );
}

export const viewport: Viewport = {
  themeColor: "#080A0D",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const abs = (route: string) => `${site.url}${route}`;

export function buildMetadata(locale: Locale): Metadata {
  const title = tr(site.title, locale);
  const description = tr(site.description, locale);
  const url = abs(localeRoute(locale));
  const image = abs("/og-image.png");
  return {
    metadataBase: new URL(`${site.url}/`),
    title,
    description,
    applicationName: site.name,
    keywords:
      locale === "es"
        ? ["videos para redes sociales", "edición de video", "videoclips", "visualizers", "piezas gráficas", "motion graphics", "diseño de portadas", "HXNS"]
        : ["social media videos", "video editor", "music videos", "visualizers", "graphic design", "motion graphics", "cover art", "HXNS"],
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(locales.map((l) => [htmlLang[l], abs(localeRoute(l))])),
        "x-default": abs("/"),
      },
    },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title,
      description,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    robots: { index: true, follow: true },
    referrer: "strict-origin-when-cross-origin",
    formatDetection: { telephone: false, email: false, address: false },
  };
}
