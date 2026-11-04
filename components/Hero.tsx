"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { person, site } from "@/site.config";
import { asset, timecode } from "@/lib/asset";
import { tr, ui, type Locale } from "@/lib/i18n";
import { REVEAL_EVENT } from "./Intro";
import styles from "./Hero.module.css";

type NetInfo = { saveData?: boolean; effectiveType?: string };

export default function Hero({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const tc = useRef<HTMLSpanElement>(null);
  const [playing, setPlaying] = useState(false);
  const { hero } = site;
  const t = ui[locale];
  const headline = tr(hero.headline, locale);
  const location = `${person.city} — ${tr(person.country, locale)}`;

  // The muted loop loads after the page is interactive; nothing on data-saver / 2G (the poster stays)
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const conn = (navigator as Navigator & { connection?: NetInfo }).connection;
    if (conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? "")) return;
    v.src = asset(hero.video.src);
    v.play().catch(() => {
      /* autoplay blocked — the poster stays */
    });
  }, [hero.video.src]);

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
      gsap.set(q(`.${styles.screen}`), { scale: 1.08, autoAlpha: 0 });
      gsap.set(q(`.${styles.ambient}`), { scale: 1.15 });
    }, el);

    const play = () => {
      ctx.add(() => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.to(q(`.${styles.ambient}`), { scale: 1, duration: 2.4 })
          .to(q(`.${styles.screen}`), { scale: 1, autoAlpha: 1, duration: 1.6 }, 0.2)
          .to(q(`.${styles.mark} span`), { yPercent: 0, duration: 1.6, stagger: 0.07 }, 0.15)
          .to(q("[data-hero-line] > span"), { yPercent: 0, duration: 1.3, stagger: 0.1 }, 0.35)
          .to(q("[data-hero-fade]"), { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.06 }, 0.6);

        gsap.to(q(`.${styles.ambient}`), {
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
    <section id="top" ref={root} className={styles.hero} aria-label={t.heroLabel}>
      <div className={styles.ambient} aria-hidden="true">
        <Image className={styles.ambientImg} src={asset(hero.video.ambient)} alt="" fill sizes="100vw" />
        <div className={styles.shade} />
      </div>

      <figure className={styles.screen} aria-hidden="true">
        <Image className={styles.poster} src={asset(hero.video.poster)} alt="" fill sizes="(max-width: 860px) 100vw, 40vw" priority />
        <video
          ref={video}
          className={`${styles.video} ${playing ? styles.isPlaying : ""}`}
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          onPlaying={() => setPlaying(true)}
          tabIndex={-1}
        />
        <figcaption className={`mono ${styles.screenMeta}`}>
          <span className={styles.rec}>
            <span className={styles.recDot} /> {tr(hero.video.label, locale)}
          </span>
          <span ref={tc}>00:00:00:00</span>
        </figcaption>
      </figure>

      <div className={styles.frame} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className={styles.top}>
        <p className={`mono ${styles.meta}`} data-hero-fade>
          <span>{tr(hero.roles, locale)}</span>
        </p>
        <p className={`mono ${styles.meta} ${styles.metaRight}`} data-hero-fade>
          <span>{location}</span>
          {site.availability.open && (
            <span className={styles.avail}>
              <span className="dot" aria-hidden="true" /> {tr(site.availability.label, locale)}
            </span>
          )}
        </p>
      </div>

      <div className={styles.content}>
        <h1 className={`mono ${styles.kicker}`} data-hero-fade>
          {tr(hero.h1, locale)}
        </h1>
        <p className={styles.headline}>
          {headline.map((line, i) => (
            <span key={i} className="line-mask" data-hero-line>
              <span>
                {i === headline.length - 1 ? (
                  <>
                    {line.replace(/.$/, "")}
                    <span className={styles.period}>.</span>
                  </>
                ) : (
                  `${line} `
                )}
              </span>
            </span>
          ))}
        </p>
        <div className={styles.ctas} data-hero-fade>
          <a href="#work" className="btn btn--solid">
            {tr(hero.primaryCta, locale)}
            <ArrowDownRight aria-hidden="true" />
          </a>
          <a href="#about" className="btn">
            {tr(hero.secondaryCta, locale)}
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
        {t.scroll}
      </a>
    </section>
  );
}
