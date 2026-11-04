"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { asset, pad2, ratio } from "@/lib/asset";
import { tr, ui, type Locale } from "@/lib/i18n";
import { aspectOf, parseMedia } from "@/lib/projects";
import VideoPlayer from "./VideoPlayer";
import EmbedPlayer from "./EmbedPlayer";
import styles from "./Player.module.css";

/** The screen area of the player: a video, an embed or one or more images. */
export default function ProjectStage({ project, locale }: { project: Project; locale: Locale }) {
  const title = tr(project.title, locale);
  const media = parseMedia(project);
  const [piece, setPiece] = useState(0);

  return (
    <div className={styles.stage} style={{ "--r": ratio(aspectOf(project)) } as React.CSSProperties}>
      <div className={styles.screen}>
        {media.kind === "mp4" && <VideoPlayer src={media.src} poster={project.thumbnail} title={title} locale={locale} />}
        {(media.kind === "youtube" || media.kind === "vimeo") && (
          <EmbedPlayer source={{ type: media.kind, id: media.id }} title={title} locale={locale} />
        )}
        {media.kind === "images" && (
          <Gallery
            images={media.images}
            alt={project.alt ? tr(project.alt, locale) : title}
            index={piece}
            onChange={setPiece}
            title={title}
            locale={locale}
          />
        )}
      </div>
    </div>
  );
}

function Gallery({
  images,
  alt,
  index,
  onChange,
  title,
  locale,
}: {
  images: string[];
  alt: string;
  index: number;
  onChange: (i: number) => void;
  title: string;
  locale: Locale;
}) {
  const t = ui[locale];
  const total = images.length;
  const go = (dir: 1 | -1) => onChange((index + dir + total) % total);

  // ← / → move between images (Shift + arrows still switch projects)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.shiftKey || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "ArrowRight") onChange((index + 1) % total);
      if (e.key === "ArrowLeft") onChange((index - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, total, onChange]);

  return (
    <figure className={styles.gallery} aria-roledescription="carousel" aria-label={title}>
      <div className={styles.galleryImg} key={images[index]}>
        <Image src={asset(images[index])} alt={alt} fill sizes="(max-width: 760px) 100vw, 70vw" className={styles.galleryPic} priority />
      </div>
      {total > 1 && (
        <>
          <button type="button" className={`${styles.galleryNav} ${styles.galleryPrev}`} onClick={() => go(-1)} aria-label={t.prevPiece}>
            <ArrowLeft aria-hidden="true" />
          </button>
          <button type="button" className={`${styles.galleryNav} ${styles.galleryNext}`} onClick={() => go(1)} aria-label={t.nextPiece}>
            <ArrowRight aria-hidden="true" />
          </button>
          <figcaption className={`${styles.galleryCap} mono`} aria-live="polite">
            <span>
              {t.piece} {pad2(index + 1)} / {pad2(total)}
            </span>
          </figcaption>
        </>
      )}
    </figure>
  );
}
