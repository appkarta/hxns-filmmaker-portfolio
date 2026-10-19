"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { GallerySource, Project } from "@/lib/types";
import { asset, pad2, ratio } from "@/lib/asset";
import { tr, ui, type Locale } from "@/lib/i18n";
import VideoPlayer from "./VideoPlayer";
import EmbedPlayer from "./EmbedPlayer";
import styles from "./Player.module.css";

/** The screen area of the player: a video, an embed or a gallery of still pieces. */
export default function ProjectStage({ project, locale }: { project: Project; locale: Locale }) {
  const title = tr(project.title, locale);
  const media = project.media;
  const [piece, setPiece] = useState(0);
  const gallery = media.type === "gallery" ? media : null;
  const aspect = gallery ? gallery.images[piece].aspect : project.aspect;

  return (
    <div className={styles.stage} style={{ "--r": ratio(aspect) } as React.CSSProperties}>
      <div className={styles.screen}>
        {media.type === "mp4" && (
          <VideoPlayer src={media.src} poster={media.poster ?? project.cover} title={title} locale={locale} />
        )}
        {(media.type === "youtube" || media.type === "vimeo") && <EmbedPlayer source={media} title={title} locale={locale} />}
        {gallery && <Gallery gallery={gallery} index={piece} onChange={setPiece} title={title} locale={locale} />}
      </div>
    </div>
  );
}

function Gallery({
  gallery,
  index,
  onChange,
  title,
  locale,
}: {
  gallery: GallerySource;
  index: number;
  onChange: (i: number) => void;
  title: string;
  locale: Locale;
}) {
  const t = ui[locale];
  const total = gallery.images.length;
  const go = (dir: 1 | -1) => onChange((index + dir + total) % total);
  const img = gallery.images[index];

  // ← / → move between pieces (Shift + arrows still switch projects)
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
      <div className={styles.galleryImg} key={img.src}>
        <Image src={asset(img.src)} alt={tr(img.alt, locale)} fill sizes="(max-width: 760px) 100vw, 70vw" className={styles.galleryPic} priority />
      </div>
      {total > 1 && (
        <>
          <button type="button" className={`${styles.galleryNav} ${styles.galleryPrev}`} onClick={() => go(-1)} aria-label={t.prevPiece}>
            <ArrowLeft aria-hidden="true" />
          </button>
          <button type="button" className={`${styles.galleryNav} ${styles.galleryNext}`} onClick={() => go(1)} aria-label={t.nextPiece}>
            <ArrowRight aria-hidden="true" />
          </button>
        </>
      )}
      <figcaption className={`${styles.galleryCap} mono`} aria-live="polite">
        <span>
          {t.piece} {pad2(index + 1)} / {pad2(total)}
        </span>
        {img.caption && <span>{tr(img.caption, locale)}</span>}
      </figcaption>
    </figure>
  );
}
