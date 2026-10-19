"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { archive } from "@/site.config";
import { asset } from "@/lib/asset";
import { tr, ui, type Locale } from "@/lib/i18n";
import AccentTitle from "../AccentTitle";
import styles from "./Archive.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Archive({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);

  // Desktop: vertical scroll drives a horizontal reel. Elsewhere: native swipe.
  useEffect(() => {
    const vp = viewport.current;
    const tr = track.current;
    if (!vp || !tr) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1025px) and (prefers-reduced-motion: no-preference)", () => {
      vp.dataset.pinned = "true";
      const distance = () => Math.max(0, tr.scrollWidth - vp.clientWidth);
      const tween = gsap.to(tr, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: vp,
          start: "center center",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      return () => {
        delete vp.dataset.pinned;
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(tr, { clearProps: "transform" });
      };
    });
    return () => mm.revert();
  }, []);

  // Loops play only while visible
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) return;
    const videos = section.current?.querySelectorAll<HTMLVideoElement>("video[data-src]") ?? [];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          const v = target as HTMLVideoElement;
          if (isIntersecting) {
            if (!v.src) v.src = v.dataset.src!;
            v.play()
              .then(() => v.classList.add(styles.playing))
              .catch(() => {});
          } else v.pause();
        });
      },
      { threshold: 0.35 },
    );
    videos.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);

  return (
    <section id="archive" ref={section} className={styles.section} aria-labelledby="archive-title">
      <div className={`container ${styles.head}`}>
        <p className="section-label mono" data-reveal="fade">
          {t.archiveLabel}
        </p>
        <h2 id="archive-title" className="display">
          <span data-reveal="lines">
            <AccentTitle parts={t.archiveTitle} />
          </span>
        </h2>
        <div className={styles.lead} data-reveal="stagger">
          <p>{t.archiveLead}</p>
          <p className="mono dim">
            {t.archiveCount(archive.length)} <span aria-hidden="true">{t.archiveHint}</span>
          </p>
        </div>
      </div>

      <div ref={viewport} className={styles.viewport} tabIndex={0} aria-label={t.archiveAria} role="region">
        <ul ref={track} className={styles.track}>
          {archive.map((item, i) => {
            const vertical = item.aspect === "9:16" || item.aspect === "4:5";
            return (
              <li key={item.id} className={`${styles.item} ${vertical ? styles.vertical : ""} ${i % 3 === 1 ? styles.low : ""}`}>
                <div className={styles.frame} style={{ aspectRatio: item.aspect.replace(":", " / ") }}>
                  <Image src={asset(item.image)} alt={tr(item.alt, locale)} fill sizes="(max-width: 760px) 70vw, 40vw" className={styles.img} />
                  {item.loop && (
                    <video
                      className={styles.loop}
                      data-src={asset(item.loop)}
                      muted
                      loop
                      playsInline
                      preload="none"
                      aria-hidden="true"
                      tabIndex={-1}
                    />
                  )}
                  <span className={`${styles.edge} mono`} aria-hidden="true">
                    {item.id} ▸ {item.aspect}
                  </span>
                </div>
                <div className={styles.caption}>
                  <span className="mono" style={{ color: "var(--ice)" }}>
                    {item.id}
                  </span>
                  <span className={styles.itemTitle}>{tr(item.title, locale)}</span>
                  <span className="mono dim">
                    {tr(item.kind, locale)} · {item.year}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
