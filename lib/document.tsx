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

/** <html>/<body> shell shared by the English and Spanish root layouts. */
export function RootDocument({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html lang={htmlLang[locale]} className={fontClasses}>
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
        ? ["cineasta", "edición de video", "videografía", "etalonaje", "videoclips", "films de marca", "HXNS"]
        : ["filmmaker", "video editor", "videographer", "color grading", "music videos", "brand films", "HXNS"],
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
  };
}
