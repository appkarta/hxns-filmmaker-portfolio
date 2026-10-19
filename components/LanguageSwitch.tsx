"use client";

import { localeHref, localeNames, locales, ui, type Locale } from "@/lib/i18n";
import { rememberLanguage } from "./LanguageMemory";
import styles from "./LanguageSwitch.module.css";

/** EN / ES selector. Each language is its own static page, so switching is a normal link. */
export default function LanguageSwitch({ locale, className = "" }: { locale: Locale; className?: string }) {
  return (
    <nav className={`${styles.switch} mono ${className}`} aria-label={ui[locale].language}>
      {locales.map((l, i) => (
        <span key={l} className={styles.item}>
          {i > 0 && (
            <span className={styles.sep} aria-hidden="true">
              /
            </span>
          )}
          {l === locale ? (
            <span className={styles.current} aria-current="true" lang={l}>
              <span aria-hidden="true">{l.toUpperCase()}</span>
              <span className="sr-only">{localeNames[l]}</span>
            </span>
          ) : (
            <a
              href={localeHref(l)}
              hrefLang={l}
              lang={l}
              className={styles.link}
              onClick={(e) => {
                rememberLanguage(l);
                // keep the current section / open project
                const hash = window.location.hash;
                if (hash) {
                  e.preventDefault();
                  window.location.href = localeHref(l) + hash;
                }
              }}
            >
              <span aria-hidden="true">{l.toUpperCase()}</span>
              <span className="sr-only">{localeNames[l]}</span>
            </a>
          )}
        </span>
      ))}
    </nav>
  );
}
