"use client";

import { useEffect } from "react";
import { defaultLocale, localeHref, type Locale } from "@/lib/i18n";

export const LANG_KEY = "hxns-lang";

/**
 * Remembers an explicit language choice. If someone picked Spanish before and lands on the
 * English home page again, send them back to /es/ (keeping any #section or #work/<slug>).
 * Nothing is auto-detected: without a saved choice, the URL decides the language.
 */
export default function LanguageMemory({ locale }: { locale: Locale }) {
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(LANG_KEY);
    } catch {
      return;
    }
    if (locale === defaultLocale && saved && saved !== locale && (saved === "es" || saved === "en")) {
      window.location.replace(localeHref(saved as Locale) + window.location.hash);
    }
  }, [locale]);
  return null;
}

export function rememberLanguage(locale: Locale) {
  try {
    localStorage.setItem(LANG_KEY, locale);
  } catch {
    /* storage blocked — the link still works */
  }
}
