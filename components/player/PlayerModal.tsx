"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { Project } from "@/lib/types";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { pad2 } from "@/lib/asset";
import VideoPlayer from "./VideoPlayer";
import EmbedPlayer from "./EmbedPlayer";
import styles from "./Player.module.css";

type Props = {
  project: Project;
  index: number;
  total: number;
  prev: Project;
  next: Project;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
};

export default function PlayerModal({ project, index, total, prev, next, onPrev, onNext, onClose }: Props) {
  const dialog = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const vertical = project.aspect === "9:16" || project.aspect === "4:5";

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
          Selected Works — <span className={styles.white}>{pad2(index + 1)}</span> / {pad2(total)}
        </span>
        <button ref={closeBtn} type="button" className={`${styles.close} mono`} onClick={onClose}>
          Close <span className="dim">(Esc)</span>
          <X aria-hidden="true" />
        </button>
      </div>

      <div className={`${styles.stage} ${vertical ? styles.vertical : ""}`} key={project.slug}>
        <div className={styles.screen} style={{ aspectRatio: project.aspect.replace(":", " / ") }}>
          {project.video.type === "mp4" ? (
            <VideoPlayer src={project.video.src} poster={project.video.poster ?? project.cover} title={project.title} />
          ) : (
            <EmbedPlayer source={project.video} title={project.title} />
          )}
        </div>
      </div>

      <div className={styles.info} key={`${project.slug}-info`}>
        <div className={styles.titleBlock}>
          <p className="mono dim">
            {project.category}
            {project.demo && <span className={styles.demo}>Demo</span>}
          </p>
          <h2 id="player-title" className={styles.title}>
            {project.title}
          </h2>
          <p className={styles.desc}>{project.description}</p>
        </div>

        <dl className={`${styles.meta} mono`}>
          <div>
            <dt>Year</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>Work</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Format</dt>
            <dd>{project.aspect}</dd>
          </div>
          {project.details?.map((d) => (
            <div key={d.label}>
              <dt>{d.label}</dt>
              <dd>{d.value}</dd>
            </div>
          ))}
        </dl>

        <nav className={styles.pager} aria-label="Project navigation">
          <button type="button" onClick={onPrev} className={styles.pageBtn}>
            <ArrowLeft aria-hidden="true" />
            <span>
              <span className="mono dim">Previous</span>
              <span className={styles.pageTitle}>{prev.title}</span>
            </span>
          </button>
          <button type="button" onClick={onNext} className={`${styles.pageBtn} ${styles.pageNext}`}>
            <span>
              <span className="mono dim">Next</span>
              <span className={styles.pageTitle}>{next.title}</span>
            </span>
            <ArrowRight aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  );
}
