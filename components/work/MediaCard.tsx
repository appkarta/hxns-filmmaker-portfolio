"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Images, Play } from "lucide-react";
import type { Project } from "@/lib/types";
import { asset } from "@/lib/asset";
import { tr, ui, workCategories, type Locale } from "@/lib/i18n";
import { aspectOf } from "@/lib/projects";
import { usePlayer } from "@/components/player/PlayerProvider";
import styles from "./Work.module.css";

type Props = { project: Project; locale: Locale; sizes: string; className?: string; label?: string };

type NetInfo = { saveData?: boolean };

/**
 * A project's poster that opens the player. The short muted preview loop only loads
 * on hover (desktop) or while the card is in the middle of the screen (touch).
 */
export default function MediaCard({ project, locale, sizes, className = "", label }: Props) {
  const t = ui[locale];
  const { open } = usePlayer();
  const card = useRef<HTMLAnchorElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const aspect = aspectOf(project);
  const isImage = project.mediaType === "image";
  const title = tr(project.title, locale);
  const category = tr(workCategories.find((c) => c.id === project.category)!.label, locale);
  const cover = project.thumbnail ?? (isImage ? project.media : undefined);

  const start = () => {
    const v = video.current;
    if (!v || !project.preview) return;
    if (!v.src) v.src = asset(project.preview);
    v.play()
      .then(() => setActive(true))
      .catch(() => {});
  };
  const stop = () => {
    video.current?.pause();
    setActive(false);
  };

  // Touch screens: play the loop while the card is centred in view; always pause off screen
  useEffect(() => {
    const el = card.current;
    if (!el || !project.preview) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: NetInfo }).connection?.saveData;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return stop();
        if (!fine && !reduce && !saveData) start();
      },
      { rootMargin: "-30% 0px -30% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [project.preview]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <a
      ref={card}
      href={`#work/${project.id}`}
      className={`${styles.media} ${active ? styles.active : ""} ${className}`}
      style={{ aspectRatio: aspect.replace(":", " / ") }}
      onClick={(e) => {
        e.preventDefault();
        open(project.id);
      }}
      onPointerEnter={(e) => e.pointerType === "mouse" && start()}
      onPointerLeave={(e) => e.pointerType === "mouse" && stop()}
      onFocus={start}
      onBlur={stop}
      data-cursor={isImage ? "view" : "play"}
      aria-label={isImage ? `${t.viewPieces}: ${title} — ${category}` : t.playAria(title, category)}
    >
      <span className={styles.reveal} data-reveal="media">
        <span className={styles.mediaInner}>
          {cover && (
            <Image
              src={asset(cover)}
              alt={project.alt ? tr(project.alt, locale) : title}
              fill
              sizes={sizes}
              className={styles.cover}
            />
          )}
          {project.preview && (
            <video ref={video} className={styles.preview} muted loop playsInline preload="none" tabIndex={-1} aria-hidden="true" />
          )}
        </span>
      </span>
      <span className={styles.shade} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.tl} mono`} aria-hidden="true">
        {label ?? category}
      </span>
      <span className={`${styles.corner} ${styles.tr} mono`} aria-hidden="true">
        {aspect}
      </span>
      <span className={`${styles.corner} ${styles.bl} mono`} aria-hidden="true">
        {isImage ? <Images /> : <Play fill="currentColor" />} {isImage ? t.viewPieces : t.playFilm}
      </span>
    </a>
  );
}
