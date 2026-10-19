import Image from "next/image";
import { site } from "@/site.config";
import { asset, pad2 } from "@/lib/asset";
import { tr, ui, type Locale } from "@/lib/i18n";
import AccentTitle from "./AccentTitle";
import styles from "./About.module.css";

export default function About({ locale }: { locale: Locale }) {
  const { about } = site;
  const t = ui[locale];

  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className={`container ${styles.grid}`}>
        <p className={`section-label mono ${styles.label}`} data-reveal="fade">
          {t.aboutLabel}
        </p>

        <figure className={styles.portrait}>
          <div className={styles.portraitMedia} data-parallax="0.14">
            <div className={styles.parallaxInner}>
              <Image
                src={asset(about.portrait)}
                alt={tr(about.portraitAlt, locale)}
                fill
                sizes="(max-width: 760px) 100vw, 36vw"
                className={styles.img}
              />
            </div>
          </div>
          <figcaption className="mono dim">
            {about.portraitIsPlaceholder ? t.portraitPlaceholder : site.name}
            <span>{tr(site.concept, locale)}</span>
          </figcaption>
        </figure>

        <div className={styles.text}>
          <h2 id="about-title" className={`display ${styles.title}`}>
            <span data-reveal="lines">
              <AccentTitle parts={t.aboutTitle} />
            </span>
          </h2>
          <p className={styles.statement} data-scrub="words">
            {tr(about.statement, locale)}
          </p>

          <div className={styles.cols} data-reveal="stagger">
            <div>
              <p className="mono dim">{t.vision}</p>
              <p>{tr(about.vision, locale)}</p>
            </div>
            <div>
              <p className="mono dim">{t.approach}</p>
              <p>{tr(about.approach, locale)}</p>
            </div>
          </div>
        </div>

        <ol className={styles.principles} aria-label={t.principles}>
          {about.principles.map((p, i) => (
            <li key={p.en} data-reveal="fade">
              <span className="mono dim">{pad2(i + 1)}</span>
              <span className={styles.principle}>{tr(p, locale)}</span>
            </li>
          ))}
        </ol>

        <div className={styles.stills}>
          {about.stills.slice(0, 4).map((s, i) => (
            <figure key={s.src} className={`${styles.still} ${styles[`s${i + 1}`]}`}>
              <div className={styles.stillMedia} data-reveal="media">
                <div className={styles.stillInner}>
                  <Image src={asset(s.src)} alt={tr(s.alt, locale)} fill sizes="(max-width: 760px) 50vw, 25vw" className={styles.img} />
                </div>
              </div>
              <figcaption className="mono dim">
                <span>FR {pad2(i + 1)}</span> {tr(s.caption, locale)}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
