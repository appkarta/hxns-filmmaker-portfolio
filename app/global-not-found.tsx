import type { Metadata } from "next";
import { fontClasses, securityMeta } from "@/lib/document";
import { localeHref } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "404 — HXNS®",
  robots: { index: false },
};

/** One 404 for both languages (the site has an English and a Spanish root layout). */
export default function GlobalNotFound() {
  return (
    <html lang="es" className={fontClasses}>
      <head>{securityMeta}</head>
      <body>
        <main className="nf-page">
          <p className="mono dim">
            Error 404 — Fotograma no encontrado · <span lang="en">Frame not found</span>
          </p>
          <h1 className="nf-code">
            4<span className="serif">0</span>4
          </h1>
          <p className="nf-text">
            Este plano no llegó al montaje final.
            <br />
            <span lang="en" className="dim">
              This shot didn&apos;t make the final cut.
            </span>
          </p>
          <div className="nf-links">
            <a href={localeHref("es")} className="btn btn--solid">
              Volver al inicio
            </a>
            <a href={localeHref("en")} className="btn" lang="en">
              Back to the reel
            </a>
          </div>
          <div className="grain" aria-hidden="true" />
        </main>
      </body>
    </html>
  );
}
