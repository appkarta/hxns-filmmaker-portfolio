import Image from "next/image";
import { site } from "@/site.config";
import { asset, pad2 } from "@/lib/asset";
import styles from "./About.module.css";

export default function About() {
  const { about } = site;
  const [s1, s2, s3, s4] = about.stills;

  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className={`container ${styles.grid}`}>
        <p className={`section-label mono ${styles.label}`} data-reveal="fade">
          (02) Behind the lens
        </p>

        <figure className={styles.portrait}>
          <div className={styles.portraitMedia} data-parallax="0.14">
            <div className={styles.parallaxInner}>
              <Image src={asset(about.portrait)} alt={about.portraitAlt} fill sizes="(max-width: 760px) 100vw, 36vw" className={styles.img} />
            </div>
          </div>
          <figcaption className="mono dim">
            {about.portraitIsPlaceholder ? "Portrait — placeholder" : site.name}
            <span>{site.concept}</span>
          </figcaption>
        </figure>

        <div className={styles.text}>
          <h2 id="about-title" className={`display ${styles.title}`}>
            <span data-reveal="lines">
              Behind <span className="serif">the</span> lens
            </span>
          </h2>
          <p className={styles.statement} data-scrub="words">
            {about.statement}
          </p>

          <div className={styles.cols} data-reveal="stagger">
            <div>
              <p className="mono dim">Vision</p>
              <p>{about.vision}</p>
            </div>
            <div>
              <p className="mono dim">Approach</p>
              <p>{about.approach}</p>
            </div>
          </div>
        </div>

        <ol className={styles.principles} aria-label="Principles">
          {about.principles.map((p, i) => (
            <li key={p} data-reveal="fade">
              <span className="mono dim">{pad2(i + 1)}</span>
              <span className={styles.principle}>{p}</span>
            </li>
          ))}
        </ol>

        <div className={styles.stills}>
          {[s1, s2, s3, s4].filter(Boolean).map((s, i) => (
            <figure key={s.src} className={`${styles.still} ${styles[`s${i + 1}`]}`}>
              <div className={styles.stillMedia} data-reveal="media">
                <div className={styles.stillInner}>
                  <Image src={asset(s.src)} alt={s.alt} fill sizes="(max-width: 760px) 50vw, 25vw" className={styles.img} />
                </div>
              </div>
              <figcaption className="mono dim">
                <span>FR {pad2(i + 1)}</span> {s.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
