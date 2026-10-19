import type { MetadataRoute } from "next";
import { site } from "@/site.config";
import { htmlLang, localeRoute, locales } from "@/lib/i18n";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [htmlLang[l], `${site.url}${localeRoute(l)}`]));
  return locales.map((l) => ({
    url: `${site.url}${localeRoute(l)}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: l === "en" ? 1 : 0.9,
    alternates: { languages },
  }));
}
