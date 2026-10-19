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
    <html lang="en" className={fontClasses}>
      <head>{securityMeta}</head>
      <body>
        <main className="nf-page">
          <p className="mono dim">
            Error 404 — Frame not found · <span lang="es">Fotograma no encontrado</span>
          </p>
          <h1 className="nf-code">
            4<span className="serif">0</span>4
          </h1>
          <p className="nf-text">
            This shot didn&apos;t make the final cut.
            <br />
            <span lang="es" className="dim">
              Este plano no llegó al montaje final.
            </span>
          </p>
          <div className="nf-links">
            <a href={localeHref("en")} className="btn btn--solid">
              Back to the reel
            </a>
            <a href={localeHref("es")} className="btn" lang="es">
              Volver al inicio
            </a>
          </div>
          <div className="grain" aria-hidden="true" />
        </main>
      </body>
    </html>
  );
}
