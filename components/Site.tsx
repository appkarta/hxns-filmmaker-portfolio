import Intro from "@/components/Intro";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Work from "@/components/work/Work";
import About from "@/components/About";
import Services from "@/components/services/Services";
import Contact from "@/components/Contact";
import ScrollHud from "@/components/ScrollHud";
import Cursor from "@/components/Cursor";
import Motion from "@/components/motion/Motion";
import PlayerProvider from "@/components/player/PlayerProvider";
import LanguageMemory from "@/components/LanguageMemory";
import StructuredData from "@/components/StructuredData";
import { ui, type Locale } from "@/lib/i18n";

/** The whole landing page, rendered once per language. */
export default function Site({ locale }: { locale: Locale }) {
  return (
    <PlayerProvider locale={locale}>
      <StructuredData locale={locale} />
      <LanguageMemory locale={locale} />
      <a href="#main" className="skip-link">
        {ui[locale].skip}
      </a>
      <Intro locale={locale} />
      <Header locale={locale} />
      <main id="main">
        <Hero locale={locale} />
        <Work locale={locale} />
        <About locale={locale} />
        <Services locale={locale} />
        <Contact locale={locale} />
      </main>
      <ScrollHud locale={locale} />
      <Cursor locale={locale} />
      <div className="grain" aria-hidden="true" />
      <Motion />
    </PlayerProvider>
  );
}
