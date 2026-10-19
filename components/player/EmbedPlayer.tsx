"use client";

import { useState } from "react";
import type { VideoSource } from "@/lib/types";
import styles from "./Player.module.css";

type Props = { source: Extract<VideoSource, { type: "youtube" | "vimeo" }>; title: string };

/** YouTube (privacy-enhanced) or Vimeo embed. Loaded only when the project opens. */
export default function EmbedPlayer({ source, title }: Props) {
  const [loaded, setLoaded] = useState(false);
  const src =
    source.type === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(source.id)}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
      : `https://player.vimeo.com/video/${encodeURIComponent(source.id)}?autoplay=1&dnt=1&title=0&byline=0&portrait=0${
          source.hash ? `&h=${encodeURIComponent(source.hash)}` : ""
        }`;

  return (
    <div className={styles.player}>
      {!loaded && (
        <div className={styles.loading} role="status">
          <span className={styles.spinner} aria-hidden="true" />
          <span className="sr-only">Loading video</span>
        </div>
      )}
      <iframe
        className={styles.iframe}
        src={src}
        title={`${title} — ${source.type === "youtube" ? "YouTube" : "Vimeo"} video`}
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        allowFullScreen
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
