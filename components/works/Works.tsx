import { projects } from "@/site.config";
import type { Category } from "@/lib/types";
import { pad2 } from "@/lib/asset";
import { categoryLabels, tr, ui, type Locale } from "@/lib/i18n";
import AccentTitle from "../AccentTitle";
import ProjectCard from "./ProjectCard";
import styles from "./Works.module.css";

const CATEGORIES: Category[] = [
  "Social Media Videos",
  "Music Videos",
  "Music Visuals",
  "Graphic Pieces",
  "Motion Graphics",
  "Brand Content",
  "Video Edits",
];

export default function Works({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const hasDemo = projects.some((p) => p.demo);
  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <div className={`container ${styles.head}`}>
        <p className="section-label mono" data-reveal="fade">
          {t.workLabel}
        </p>
        <h2 id="work-title" className={`display ${styles.title}`}>
          <span data-reveal="lines">
            <AccentTitle parts={t.workTitle} />
          </span>
          <sup className={`mono ${styles.count}`} aria-label={t.projectsCount(projects.length)}>
            (<span data-count={projects.length}>{pad2(projects.length)}</span>)
          </sup>
        </h2>
        <div className={styles.intro} data-reveal="stagger">
          <p className={styles.lead}>{t.workLead}</p>
          <ul className={`${styles.cats} mono dim`} aria-label={t.categories}>
            {CATEGORIES.map((c) => (
              <li key={c}>{tr(categoryLabels[c], locale)}</li>
            ))}
          </ul>
          {hasDemo && (
            <p className={`mono ${styles.notice}`}>
              <span className={styles.demoTag}>{t.demo}</span> {t.demoNotice}
            </p>
          )}
        </div>
      </div>

      <div className={`container ${styles.grid}`}>
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} total={projects.length} locale={locale} />
        ))}
      </div>
    </section>
  );
}
