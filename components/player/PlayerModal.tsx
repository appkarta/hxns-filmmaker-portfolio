"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { Project } from "@/lib/types";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { pad2 } from "@/lib/asset";
import { categoryLabels, tr, ui, type Locale } from "@/lib/i18n";
import ProjectStage from "./ProjectStage";
import styles from "./Player.module.css";

type Props = {
  locale: Locale;
  project: Project;
  index: number;
  total: number;
  prev: Project;
  next: Project;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
};

export default function PlayerModal({ locale, project, index, total, prev, next, onPrev, onNext, onClose }: Props) {
  const t = ui[locale];
  const title = tr(project.title, locale);
  const dialog = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    lockScroll();
    closeBtn.current?.focus({ preventScroll: true });
    return () => unlockScroll();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (tag === "INPUT") return;
      if (e.key === "PageDown" || (e.key === "ArrowRight" && e.shiftKey)) onNext();
      if (e.key === "PageUp" || (e.key === "ArrowLeft" && e.shiftKey)) onPrev();
      if (e.key === "Tab" && dialog.current) {
        const items = Array.from(
          dialog.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input, iframe, [tabindex]:not([tabindex="-1"])'),
        );
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNext, onPrev]);

  return (
    <div
      ref={dialog}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="player-title"
      data-lenis-prevent
    >
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />

      <div className={styles.bar}>
        <span className="mono dim">
          {t.selectedWorks} — <span className={styles.white}>{pad2(index + 1)}</span> / {pad2(total)}
        </span>
        <button ref={closeBtn} type="button" className={`${styles.close} mono`} onClick={onClose}>
          {t.close} <span className="dim">(Esc)</span>
          <X aria-hidden="true" />
        </button>
      </div>

      <ProjectStage key={project.slug} project={project} locale={locale} />

      <div className={styles.info} key={`${project.slug}-info`}>
        <div className={styles.titleBlock}>
          <p className="mono dim">
            {tr(categoryLabels[project.category], locale)}
            {project.demo && <span className={styles.demo}>{t.demo}</span>}
          </p>
          <h2 id="player-title" className={styles.title}>
            {title}
          </h2>
          <p className={styles.desc}>{tr(project.description, locale)}</p>
        </div>

        <dl className={`${styles.meta} mono`}>
          <div>
            <dt>{t.year}</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>{t.work}</dt>
            <dd>{tr(project.role, locale)}</dd>
          </div>
          <div>
            <dt>{t.format}</dt>
            <dd>{project.media.type === "gallery" ? [...new Set(project.media.images.map((i) => i.aspect))].join(" · ") : project.aspect}</dd>
          </div>
          {project.details?.map((d) => (
            <div key={d.label.en}>
              <dt>{tr(d.label, locale)}</dt>
              <dd>{tr(d.value, locale)}</dd>
            </div>
          ))}
        </dl>

        <nav className={styles.pager} aria-label={t.projectNav}>
          <button type="button" onClick={onPrev} className={styles.pageBtn}>
            <ArrowLeft aria-hidden="true" />
            <span>
              <span className="mono dim">{t.previous}</span>
              <span className={styles.pageTitle}>{tr(prev.title, locale)}</span>
            </span>
          </button>
          <button type="button" onClick={onNext} className={`${styles.pageBtn} ${styles.pageNext}`}>
            <span>
              <span className="mono dim">{t.next}</span>
              <span className={styles.pageTitle}>{tr(next.title, locale)}</span>
            </span>
            <ArrowRight aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  );
}
