"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { asset, timecode } from "@/lib/asset";
import { REVEAL_EVENT } from "./Intro";
import styles from "./Hero.module.css";

type NetInfo = { saveData?: boolean; effectiveType?: string };

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const tc = useRef<HTMLSpanElement>(null);
  const [playing, setPlaying] = useState(false);
  const { hero } = site;

  // Pick the right reel: vertical crop on phones, nothing on data-saver / 2G
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const conn = (navigator as Navigator & { connection?: NetInfo }).connection;
    if (conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? "")) return;
    const mobile = window.matchMedia("(max-width: 767px), (max-aspect-ratio: 4/5)").matches;
    v.src = asset(mobile ? hero.video.mobile : hero.video.desktop);
    v.play().catch(() => {
      /* autoplay blocked — the poster stays */
    });
  }, [hero.video.desktop, hero.video.mobile]);

  // Fit the HXNS wordmark to the full width of the frame
  useEffect(() => {
    const el = root.current;
    const mark = el?.querySelector<HTMLElement>(`.${styles.mark}`);
    if (!el || !mark) return;
    const fit = () => {
      const gutter = parseFloat(getComputedStyle(mark).left) || 0;
      const target = el.clientWidth - gutter * 2;
      const current = parseFloat(getComputedStyle(mark).fontSize);
      const width = mark.scrollWidth;
      if (!width || !current) return;
      el.style.setProperty("--mark-size", `${(current * target) / width}px`);
    };
    document.fonts.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Live timecode tied to the reel
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      if (tc.current && video.current) tc.current.textContent = timecode(video.current.currentTime);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Pause the reel when the hero is off screen
  useEffect(() => {
    const v = video.current;
    const el = root.current;
    if (!v || !el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!v.src) return;
      if (entry.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Entrance, synced with the intro, plus a slow scroll-out
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const q = gsap.utils.selector(el);
    const ctx = gsap.context(() => {
      gsap.set(q("[data-hero-line] > span"), { yPercent: 110 });
      gsap.set(q("[data-hero-fade]"), { autoAlpha: 0, y: 18 });
      gsap.set(q(`.${styles.mark} span`), { yPercent: 100 });
      gsap.set(q(`.${styles.media}`), { scale: 1.18 });
    }, el);

    const play = () => {
      ctx.add(() => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.to(q(`.${styles.media}`), { scale: 1, duration: 2.4 })
          .to(q(`.${styles.mark} span`), { yPercent: 0, duration: 1.6, stagger: 0.07 }, 0.15)
          .to(q("[data-hero-line] > span"), { yPercent: 0, duration: 1.3, stagger: 0.1 }, 0.35)
          .to(q("[data-hero-fade]"), { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.06 }, 0.6);

        gsap.to(q(`.${styles.mediaWrap}`), {
          yPercent: 18,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(q(`.${styles.mark}`), {
          yPercent: -22,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
      });
    };

    if (window.__hxnsRevealed) play();
    else window.addEventListener(REVEAL_EVENT, play, { once: true });
    return () => {
      window.removeEventListener(REVEAL_EVENT, play);
      ctx.revert();
    };
  }, []);

  return (
    <section id="top" ref={root} className={styles.hero} aria-label="Introduction">
      <div className={styles.mediaWrap} aria-hidden="true">
        <div className={styles.media}>
          <picture>
            <source media="(max-width: 767px), (max-aspect-ratio: 4/5)" srcSet={asset(hero.video.posterMobile)} />
            <img className={styles.poster} src={asset(hero.video.poster)} alt="" fetchPriority="high" />
          </picture>
          <video
            ref={video}
            className={`${styles.video} ${playing ? styles.isPlaying : ""}`}
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            onPlaying={() => setPlaying(true)}
            tabIndex={-1}
          />
        </div>
        <div className={styles.shade} />
      </div>

      <div className={styles.frame} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className={styles.top}>
        <p className={`mono ${styles.meta}`} data-hero-fade>
          <span className={styles.rec}>
            <span className={styles.recDot} /> Showreel
          </span>
          <span ref={tc}>00:00:00:00</span>
        </p>
        <p className={`mono ${styles.meta} ${styles.metaRight}`} data-hero-fade>
          {hero.meta.specialty && <span>{hero.meta.specialty}</span>}
          {hero.meta.location && <span>{hero.meta.location}</span>}
          {site.availability.open && (
            <span className={styles.avail}>
              <span className="dot" aria-hidden="true" /> {site.availability.label}
            </span>
          )}
        </p>
      </div>

      <div className={styles.content}>
        <h1 className={styles.headline}>
          <span className="sr-only">
            {site.name} — {hero.headline.join(" ")}
          </span>
          {hero.headline.map((line, i) => (
            <span key={i} className="line-mask" data-hero-line aria-hidden="true">
              <span>
                {i === hero.headline.length - 1 ? (
                  <>
                    {line.replace(/\.$/, "")}
                    <span className={styles.period}>.</span>
                  </>
                ) : (
                  line
                )}
              </span>
            </span>
          ))}
        </h1>
        <p className={styles.subtitle} data-hero-fade>
          {hero.subtitle}
        </p>
        <div className={styles.ctas} data-hero-fade>
          <a href="#work" className="btn btn--solid">
            {hero.primaryCta}
            <ArrowDownRight aria-hidden="true" />
          </a>
          <a href="#contact" className="btn">
            {hero.secondaryCta}
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className={styles.mark} aria-hidden="true">
        {"HXNS".split("").map((l, i) => (
          <span key={i}>{l}</span>
        ))}
      </div>

      <a href="#work" className={`${styles.scroll} mono`} data-hero-fade>
        <span className={styles.scrollLine} aria-hidden="true" />
        Scroll
      </a>
    </section>
  );
}
