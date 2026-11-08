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

/** Seconds each photo of a gallery stays on its card */
const SLIDE_SECONDS = 4;

/**
 * A project's poster that opens the player. The short muted preview loop only loads
 * on hover (desktop) or while the card is in the middle of the screen (touch).
 * Photo galleries crossfade through their photos on the card while it is on screen.
 */
export default function MediaCard({ project, locale, sizes, className = "", label }: Props) {
  const t = ui[locale];
  const { open } = usePlayer();
  const card = useRef<HTMLAnchorElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const aspect = aspectOf(project);
  const isImage = project.mediaType === "image";
  const viewLabel = (project.gallery?.length ?? 0) > 0 ? t.viewPieces : t.viewPhoto;
  const title = tr(project.title, locale);
  const category = tr(workCategories.find((c) => c.id === project.category)!.label, locale);
  const cover = project.thumbnail ?? (isImage ? project.media : undefined);
  const extra = isImage ? (project.gallery ?? []) : [];
  // 0 = the cover; 1… = gallery photos layered on top of it (loaded once the card is first on screen)
  const [shown, setShown] = useState(0);
  const [slidesOn, setSlidesOn] = useState(false);

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

  // Galleries: next photo every few seconds — only while the card is on screen and the tab is visible
  useEffect(() => {
    const el = card.current;
    if (!el || extra.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let onScreen = false;
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) setSlidesOn(true);
    });
    io.observe(el);
    const id = window.setInterval(() => {
      if (onScreen && !document.hidden) setShown((i) => (i + 1) % (extra.length + 1));
    }, SLIDE_SECONDS * 1000);
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
  }, [extra.length]);

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
      aria-label={isImage ? `${viewLabel}: ${title} — ${category}` : t.playAria(title, category)}
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
          {slidesOn &&
            extra.map((src, i) => (
              <Image
                key={src}
                src={asset(src)}
                alt=""
                fill
                sizes={sizes}
                className={`${styles.cover} ${styles.slide} ${shown === i + 1 ? styles.isShown : ""}`}
              />
            ))}
          {project.preview && (
            <video ref={video} className={styles.preview} muted loop playsInline preload="none" tabIndex={-1} aria-hidden="true" />
          )}
        </span>
      </span>
      <span className={styles.shade} aria-hidden="true" />
      {/* Decorative labels drawn with CSS (data-text), so they never compete with the link's accessible name */}
      <span className={`${styles.corner} ${styles.tl} mono`} data-text={label ?? category} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.tr} mono`} data-text={aspect} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.bl} mono`} data-text={isImage ? viewLabel : t.playFilm} aria-hidden="true">
        {isImage ? <Images /> : <Play fill="currentColor" />}
      </span>
    </a>
  );
}
