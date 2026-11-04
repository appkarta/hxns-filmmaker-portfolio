import type { Metadata } from "next";
import { localeHref } from "@/lib/i18n";
import LegacyRedirect from "@/components/LegacyRedirect";

/** Spanish used to live at /es/ and is now the main language at "/". Old links land here and move on. */
export const metadata: Metadata = {
  title: "HXNS",
  robots: { index: false, follow: true },
  alternates: { canonical: "/" },
};

export default function OldSpanishHome() {
  const target = localeHref("es");
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <LegacyRedirect to={target} />
      <main className="nf-page">
        <p className="mono dim">HXNS</p>
        <a href={target} className="btn btn--solid">
          Ir a hxnss.co
        </a>
      </main>
    </>
  );
}
