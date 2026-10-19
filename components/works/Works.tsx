import { projects } from "@/site.config";
import type { Category } from "@/lib/types";
import { pad2 } from "@/lib/asset";
import ProjectCard from "./ProjectCard";
import styles from "./Works.module.css";

const CATEGORIES: Category[] = [
  "Commercial Films",
  "Brand Content",
  "Music Videos",
  "Social Media Films",
  "Event Films",
  "Cinematic Edits",
  "Creative Experiments",
];

export default function Works() {
  const hasDemo = projects.some((p) => p.demo);
  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <div className={`container ${styles.head}`}>
        <p className="section-label mono" data-reveal="fade">
          (01) Selected Works
        </p>
        <h2 id="work-title" className={`display ${styles.title}`}>
          <span data-reveal="lines">
            Selected <span className="serif">works</span>
          </span>
          <sup className={`mono ${styles.count}`} aria-label={`${projects.length} projects`}>
            (<span data-count={projects.length}>{pad2(projects.length)}</span>)
          </sup>
        </h2>
        <div className={styles.intro} data-reveal="stagger">
          <p className={styles.lead}>
            Films, edits and visual pieces built on intention, rhythm and emotion. Select a project to watch it.
          </p>
          <ul className={`${styles.cats} mono dim`} aria-label="Categories">
            {CATEGORIES.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          {hasDemo && (
            <p className={`mono ${styles.notice}`}>
              <span className={styles.demoTag}>Demo</span> Placeholder projects with licensed stock footage — not client work.
            </p>
          )}
        </div>
      </div>

      <div className={`container ${styles.grid}`}>
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} total={projects.length} />
        ))}
      </div>
    </section>
  );
}
