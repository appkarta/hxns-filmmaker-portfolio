"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Images, Play } from "lucide-react";
import type { Project } from "@/lib/types";
import { asset, pad2 } from "@/lib/asset";
import { usePlayer } from "@/components/player/PlayerProvider";
import { categoryLabels, tr, ui, type Locale } from "@/lib/i18n";
import styles from "./Works.module.css";

type Props = { project: Project; index: number; total: number; locale: Locale };

type NetInfo = { saveData?: boolean };

export default function ProjectCard({ project, index, total, locale }: Props) {
  const t = ui[locale];
  const title = tr(project.title, locale);
  const category = tr(categoryLabels[project.category], locale);
  const { open } = usePlayer();
  const video = useRef<HTMLVideoElement>(null);
  const card = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  const start = () => {
    const v = video.current;
    if (!v || !project.preview) return;
    if (!v.src) v.src = asset(project.preview); // load the loop only when needed
    v.play()
      .then(() => setActive(true))
      .catch(() => {});
  };
  const stop = () => {
    video.current?.pause();
    setActive(false);
  };

  // Touch screens: play the loop while the card is centred in view
  useEffect(() => {
    const el = card.current;
    if (!el || !project.preview) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: NetInfo }).connection?.saveData;
    if (fine || reduce || saveData) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const v = video.current;
        if (!v) return;
        if (entry.isIntersecting) {
          if (!v.src) v.src = asset(project.preview!);
          v.play()
            .then(() => setActive(true))
            .catch(() => {});
        } else {
          v.pause();
          setActive(false);
        }
      },
      { rootMargin: "-30% 0px -30% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [project.preview]);

  const onOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    open(project.slug);
  };

  const vertical = project.aspect === "9:16" || project.aspect === "4:5";
  const isGallery = project.media.type === "gallery";

  return (
    <article ref={card} className={`${styles.card} ${styles[project.layout]} ${active ? styles.active : ""}`}>
      <a
        href={`#work/${project.slug}`}
        className={styles.media}
        style={{ aspectRatio: project.aspect.replace(":", " / ") }}
        onClick={onOpen}
        onPointerEnter={(e) => e.pointerType === "mouse" && start()}
        onPointerLeave={(e) => e.pointerType === "mouse" && stop()}
        onFocus={start}
        onBlur={stop}
        data-cursor={isGallery ? "view" : "play"}
        aria-label={isGallery ? `${t.viewPieces}: ${title} — ${category}, ${project.year}` : t.playAria(title, category, project.year)}
      >
        <div className={styles.reveal} data-reveal="media">
          <div className={styles.mediaInner}>
            <Image
              src={asset(project.cover)}
              alt=""
              fill
              sizes={project.layout === "feature" ? "100vw" : vertical ? "(max-width: 760px) 80vw, 30vw" : "(max-width: 760px) 100vw, 66vw"}
              className={styles.cover}
              priority={index === 0}
            />
            {project.preview && (
              <video ref={video} className={styles.preview} muted loop playsInline preload="none" tabIndex={-1} aria-hidden="true" />
            )}
          </div>
        </div>
        <span className={styles.shade} aria-hidden="true" />
        <span className={`${styles.corner} ${styles.tl} mono`} aria-hidden="true">
          {pad2(index + 1)} / {pad2(total)}
        </span>
        <span className={`${styles.corner} ${styles.tr} mono`} aria-hidden="true">
          {project.demo && <span className={styles.demoTag}>{t.demo}</span>}
          {project.aspect}
        </span>
        <span className={`${styles.corner} ${styles.bl} mono`} aria-hidden="true">
          {isGallery ? <Images aria-hidden="true" /> : <Play aria-hidden="true" fill="currentColor" />} {isGallery ? t.viewPieces : t.playFilm}
        </span>
      </a>

      <div className={styles.caption}>
        <div className={styles.capTop}>
          <h3 className={styles.name}>{title}</h3>
          <p className="mono dim">
            {category} — {project.year}
          </p>
        </div>
        <div className={styles.capBottom}>
          <p className={styles.desc}>{tr(project.description, locale)}</p>
          <div className={styles.capMeta}>
            <span className="mono dim">{tr(project.role, locale)}</span>
            <button type="button" className={`${styles.view} mono`} onClick={onOpen}>
              {t.viewProject} <ArrowUpRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
