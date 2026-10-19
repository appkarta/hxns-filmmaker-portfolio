"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Maximize, Minimize, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { asset, timecode } from "@/lib/asset";
import { ui, type Locale } from "@/lib/i18n";
import styles from "./Player.module.css";

type Props = { src: string; poster?: string; title: string; locale: Locale };

export default function VideoPlayer({ src, poster, title, locale }: Props) {
  const t = ui[locale];
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [waiting, setWaiting] = useState(true);
  const [error, setError] = useState(false);
  const [full, setFull] = useState(false);
  const [idle, setIdle] = useState(false);
  const idleTimer = useRef<number>(0);

  const toggle = useCallback(() => {
    const v = video.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => setPlaying(false));
    else v.pause();
  }, []);

  const seek = useCallback((t: number) => {
    const v = video.current;
    if (!v || !Number.isFinite(v.duration)) return;
    v.currentTime = Math.min(Math.max(0, t), v.duration);
  }, []);

  const toggleFull = useCallback(() => {
    const el = wrap.current;
    const v = video.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
    else v?.webkitEnterFullscreen?.(); // iOS Safari
  }, []);

  // Start playing as soon as the project opens (user-initiated, so sound is allowed)
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    v.play().catch(() => {
      // fall back to muted autoplay if the browser refuses
      v.muted = true;
      setMuted(true);
      v.play().catch(() => setPlaying(false));
    });
  }, [src]);

  useEffect(() => {
    const onFs = () => setFull(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  // Keyboard: Space/K play, ←/→ seek, M mute, F fullscreen
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (e.shiftKey || e.metaKey || e.ctrlKey || e.altKey) return;
      const onButton = target.tagName === "BUTTON";
      const v = video.current;
      if (!v) return;
      switch (e.key) {
        case " ":
          if (onButton) return;
          e.preventDefault();
          toggle();
          break;
        case "k":
          toggle();
          break;
        case "ArrowRight":
          if (target.tagName === "INPUT") return;
          seek(v.currentTime + 5);
          break;
        case "ArrowLeft":
          if (target.tagName === "INPUT") return;
          seek(v.currentTime - 5);
          break;
        case "m":
          v.muted = !v.muted;
          setMuted(v.muted);
          break;
        case "f":
          toggleFull();
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [seek, toggle, toggleFull]);

  const wake = () => {
    setIdle(false);
    window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => setIdle(true), 2600);
  };
  useEffect(() => () => window.clearTimeout(idleTimer.current), []);

  const progress = duration ? (time / duration) * 100 : 0;

  return (
    <div
      ref={wrap}
      className={`${styles.player} ${idle && playing ? styles.idle : ""}`}
      onPointerMove={wake}
      onPointerDown={wake}
    >
      <video
        ref={video}
        className={styles.videoEl}
        src={asset(src)}
        poster={poster ? asset(poster) : undefined}
        playsInline
        preload="metadata"
        onClick={toggle}
        onPlay={() => {
          setPlaying(true);
          wake();
        }}
        onPause={() => setPlaying(false)}
        onWaiting={() => setWaiting(true)}
        onCanPlay={() => setWaiting(false)}
        onPlaying={() => setWaiting(false)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onProgress={(e) => {
          const v = e.currentTarget;
          if (v.buffered.length && v.duration) setBuffered((v.buffered.end(v.buffered.length - 1) / v.duration) * 100);
        }}
        onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
        onError={() => {
          setError(true);
          setWaiting(false);
        }}
        aria-label={`${title} — ${t.videoSuffix}`}
      />

      {waiting && !error && (
        <div className={styles.loading} role="status">
          <span className={styles.spinner} aria-hidden="true" />
          <span className="sr-only">{t.loadingVideo}</span>
        </div>
      )}

      {error && (
        <div className={styles.error} role="alert">
          <p className="mono">{t.videoError}</p>
          <button
            type="button"
            className="btn"
            onClick={() => {
              setError(false);
              setWaiting(true);
              video.current?.load();
              video.current?.play().catch(() => {});
            }}
          >
            <RotateCcw aria-hidden="true" /> {t.retry}
          </button>
        </div>
      )}

      {!playing && !waiting && !error && (
        <button type="button" className={styles.bigPlay} onClick={toggle} aria-label={t.play}>
          <Play aria-hidden="true" />
        </button>
      )}

      <div className={styles.controls}>
        <button type="button" className={styles.ctrl} onClick={toggle} aria-label={playing ? t.pause : t.play}>
          {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
        </button>
        <span className={`${styles.tc} mono`} aria-hidden="true">
          {timecode(time)}
        </span>
        <div className={styles.scrub} style={{ "--p": `${progress}%`, "--b": `${buffered}%` } as React.CSSProperties}>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.04}
            value={time}
            onChange={(e) => seek(parseFloat(e.target.value))}
            aria-label={t.seek}
            aria-valuetext={t.seekText(Math.floor(time), Math.floor(duration))}
          />
        </div>
        <span className={`${styles.tc} ${styles.tcDim} mono`} aria-hidden="true">
          {timecode(duration)}
        </span>
        <button
          type="button"
          className={styles.ctrl}
          onClick={() => {
            const v = video.current;
            if (v) v.muted = !v.muted;
          }}
          aria-label={muted ? t.unmute : t.mute}
        >
          {muted ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
        </button>
        <button type="button" className={styles.ctrl} onClick={toggleFull} aria-label={full ? t.exitFullscreen : t.fullscreen}>
          {full ? <Minimize aria-hidden="true" /> : <Maximize aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
