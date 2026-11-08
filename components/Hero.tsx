"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { person, site } from "@/site.config";
import { asset, pad2 } from "@/lib/asset";
import { tr, ui, type Locale } from "@/lib/i18n";
import { REVEAL_EVENT } from "./Intro";
import styles from "./Hero.module.css";

export default function Hero({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  // Only the first photo loads with the page; the rest join once it has loaded (never with reduced motion)
  const [allLoaded, setAllLoaded] = useState(false);
  const [current, setCurrent] = useState(0);
  const { hero } = site;
  const t = ui[locale];
  const headline = tr(hero.headline, locale);
  const location = `${person.city} — ${tr(person.country, locale)}`;

  const slides = allLoaded ? hero.slides : hero.slides.slice(0, 1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ready = () => setAllLoaded(true);
    if (document.readyState === "complete") {
      const id = requestAnimationFrame(ready);
      return () => cancelAnimationFrame(id);
    }
    window.addEventListener("load", ready, { once: true });
    return () => window.removeEventListener("load", ready);
  }, []);

  // Crossfade to the next photo every few seconds — only while the hero is on screen and the tab is visible
  useEffect(() => {
    const el = root.current;
    if (!el || !allLoaded || hero.slides.length < 2) return;
    let onScreen = true;
    const io = new IntersectionObserver(([entry]) => (onScreen = entry.isIntersecting));
    io.observe(el);
    const id = window.setInterval(() => {
      if (onScreen && !document.hidden) setCurrent((i) => (i + 1) % hero.slides.length);
    }, hero.slideSeconds * 1000);
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
  }, [allLoaded, hero.slides.length, hero.slideSeconds]);

  // Entrance, synced with the intro, plus a slow scroll-out
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const q = gsap.utils.selector(el);
    const ctx = gsap.context(() => {
      gsap.set(q("[data-hero-line] > span"), { yPercent: 110 });
      gsap.set(q("[data-hero-fade]"), { opacity: 0, y: 18 });
      gsap.set(q(`.${styles.screen}`), { scale: 1.08 });
      gsap.set(q(`.${styles.ambient}`), { scale: 1.15 });
    }, el);

    const play = () => {
      ctx.add(() => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.to(q(`.${styles.ambient}`), { scale: 1, duration: 2.4 })
          .to(q(`.${styles.screen}`), { scale: 1, duration: 1.6 }, 0.2)
          .to(q("[data-hero-line] > span"), { yPercent: 0, duration: 1.3, stagger: 0.1 }, 0.35)
          .to(q("[data-hero-fade]"), { opacity: 1, y: 0, duration: 1.1, stagger: 0.06 }, 0.6);

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
        {slides.map((s, i) => (
          <Image
            key={s.ambient}
            className={`${styles.ambientImg} ${styles.slide} ${i === current ? styles.isActive : ""}`}
            src={asset(s.ambient)}
            alt=""
            fill
            sizes="100vw"
          />
        ))}
        <div className={styles.shade} />
      </div>

      <figure className={styles.screen} aria-hidden="true">
        {slides.map((s, i) => (
          <Image
            key={s.src}
            className={`${styles.poster} ${styles.slide} ${i === current ? styles.isActive : ""}`}
            src={asset(s.src)}
            alt=""
            fill
            sizes="(max-width: 860px) 100vw, 40vw"
            priority={i === 0}
          />
        ))}
        <figcaption className={`mono ${styles.screenMeta}`}>
          <span className={styles.rec}>
            <span className={styles.recDot} /> {tr(hero.slides[current].label, locale)}
          </span>
          {slides.length > 1 && (
            <span>
              {pad2(current + 1)} / {pad2(hero.slides.length)}
            </span>
          )}
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
