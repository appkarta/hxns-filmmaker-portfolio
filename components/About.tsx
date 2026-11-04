import Image from "next/image";
import { person, site } from "@/site.config";
import { asset } from "@/lib/asset";
import { tr, ui, type Locale } from "@/lib/i18n";
import AccentTitle from "./AccentTitle";
import styles from "./About.module.css";

export default function About({ locale }: { locale: Locale }) {
  const { about } = site;
  const t = ui[locale];
  const [main, second] = about.photos;
  const facts: [string, string][] = [
    [t.name, person.name],
    [t.age, locale === "es" ? `${person.age} años` : `${person.age}`],
    [t.basedIn, `${person.city}, ${person.region} — ${tr(person.country, locale)}`],
    [t.focus, tr(about.focus, locale)],
  ];

  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className={`container ${styles.grid}`}>
        <p className={`section-label mono ${styles.label}`} data-reveal="fade">
          {t.aboutLabel}
        </p>

        <div className={styles.photos}>
          <figure className={styles.photoMain}>
            <div className={styles.photoFrame} data-parallax="0.12">
              <div className={styles.parallaxInner}>
                <Image src={asset(main.src)} alt={tr(main.alt, locale)} fill sizes="(max-width: 760px) 80vw, 34vw" className={styles.img} />
              </div>
            </div>
            <figcaption className="mono dim">
              <span>FR 01</span> {person.name}
            </figcaption>
          </figure>
          {second && (
            <figure className={styles.photoSecond}>
              <div className={styles.photoFrame} data-reveal="media">
                <div className={styles.revealInner}>
                  <Image src={asset(second.src)} alt={tr(second.alt, locale)} fill sizes="(max-width: 760px) 46vw, 18vw" className={styles.img} />
                </div>
              </div>
              <figcaption className="mono dim">
                <span>FR 02</span> HXNS
              </figcaption>
            </figure>
          )}
        </div>

        <div className={styles.text}>
          <h2 id="about-title" className={`display ${styles.title}`}>
            <span data-reveal="lines">
              <AccentTitle parts={t.aboutTitle} />
            </span>
          </h2>
          <p className={styles.intro} data-scrub="words">
            {tr(about.intro, locale)}
          </p>
          <div className={styles.body} data-reveal="stagger">
            {about.paragraphs.map((p) => (
              <p key={p.es}>{tr(p, locale)}</p>
            ))}
          </div>
          <dl className={`mono ${styles.facts}`} data-reveal="stagger">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
