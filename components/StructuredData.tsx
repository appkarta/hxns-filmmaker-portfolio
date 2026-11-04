import { projects } from "@/data/projects";
import { person, services, site } from "@/site.config";
import { htmlLang, localeRoute, tr, workCategories, type Locale } from "@/lib/i18n";

/**
 * Schema.org data for search engines. Only facts that are also visible on the page:
 * no address, phone, company, awards, reviews or ratings.
 */
export default function StructuredData({ locale }: { locale: Locale }) {
  const pageUrl = `${site.url}${localeRoute(locale)}`;
  const personId = `${site.url}/#york-hans`;
  const sameAs = [site.contact.instagram, site.contact.tiktok, site.contact.vimeo, site.contact.youtube].filter(Boolean);
  const jobTitles = locale === "es" ? ["Filmmaker", "Editor de video", "Creativo audiovisual"] : ["Filmmaker", "Video editor", "Visual creative"];

  const graph = [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: `${site.url}/`,
      name: site.name,
      description: tr(site.description, locale),
      inLanguage: ["es-CO", "en"],
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": `${pageUrl}#page`,
      url: pageUrl,
      name: tr(site.title, locale),
      inLanguage: htmlLang[locale],
      isPartOf: { "@id": `${site.url}/#website` },
      mainEntity: { "@id": personId },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: person.name,
      alternateName: site.name,
      url: `${site.url}/`,
      image: `${site.url}${site.about.photos[0].src}`,
      jobTitle: jobTitles,
      description: tr(site.about.intro, locale),
      knowsAbout: services.map((s) => tr(s.title, locale)),
      workLocation: {
        "@type": "Place",
        name: `${person.city}, ${person.region}, ${tr(person.country, locale)}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: person.city,
          addressRegion: person.region,
          addressCountry: person.countryCode,
        },
      },
      ...(sameAs.length ? { sameAs } : {}),
    },
    ...projects.map((p) => ({
      "@type": "CreativeWork",
      "@id": `${site.url}/#work/${p.id}`,
      url: `${pageUrl}#work/${p.id}`,
      name: tr(p.title, locale),
      ...(p.description ? { description: tr(p.description, locale) } : {}),
      genre: tr(workCategories.find((c) => c.id === p.category)!.label, locale),
      ...(p.thumbnail ? { image: `${site.url}${p.thumbnail}` } : {}),
      ...(p.year ? { dateCreated: p.year } : {}),
      creator: { "@id": personId },
    })),
  ];

  return (
    <script
      type="application/ld+json"
      // JSON-LD is data, not executable script; content is built from static site config at build time
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c") }}
    />
  );
}
