"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { site } from "@/site.config";
import { tr, type Locale } from "@/lib/i18n";
import styles from "./Intro.module.css";

export const REVEAL_EVENT = "hxns:reveal";

declare global {
  interface Window {
    __hxnsRevealed?: boolean;
  }
}

function reveal() {
  if (window.__hxnsRevealed) return;
  window.__hxnsRevealed = true;
  window.dispatchEvent(new Event(REVEAL_EVENT));
}

/** Short title card: HXNS rises through a mask, then the frame opens like a letterbox. */
export default function Intro({ locale }: { locale: Locale }) {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // No intro with reduced motion, or when arriving from a link to a section / project (#work/…)
    if (reduce || window.location.hash.length > 1) {
      el.style.display = "none";
      reveal();
      return;
    }

    let seen = false;
    try {
      seen = sessionStorage.getItem("hxns-intro") === "1";
      sessionStorage.setItem("hxns-intro", "1");
    } catch {
      /* storage unavailable — play the full intro */
    }

    const q = gsap.utils.selector(el);
    const frames = { v: 0 };
    const tl = gsap.timeline({
      defaults: { ease: "expo.out" },
      onComplete: () => {
        el.style.display = "none";
      },
    });

    // Short on purpose: about 1.3 s on the first visit, 0.7 s on the next ones
    const k = seen ? 0.55 : 1;
    tl.set(el, { autoAlpha: 1 })
      .from(q(`.${styles.letter}`), { yPercent: 110, duration: 0.7 * k, stagger: 0.04 })
      .from(q(`.${styles.meta}`), { autoAlpha: 0, y: 10, duration: 0.5 * k }, "<0.15")
      .to(
        frames,
        {
          v: 100,
          duration: 0.6 * k,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counter.current) counter.current.textContent = String(Math.round(frames.v)).padStart(3, "0");
          },
        },
        "<",
      )
      .to(q(`.${styles.letter}`), { yPercent: -110, duration: 0.4, stagger: 0.03, ease: "expo.in" })
      .to(q(`.${styles.meta}`), { autoAlpha: 0, duration: 0.2 }, "<")
      .add(reveal, "-=0.1")
      .to(q(`.${styles.top}`), { yPercent: -100, duration: 0.7, ease: "expo.inOut" }, "-=0.15")
      .to(q(`.${styles.bottom}`), { yPercent: 100, duration: 0.7, ease: "expo.inOut" }, "<");

    // Any key or click skips the intro
    const skip = () => tl.progress(1);
    window.addEventListener("keydown", skip, { once: true });
    el.addEventListener("pointerdown", skip, { once: true });

    return () => {
      window.removeEventListener("keydown", skip);
      tl.kill();
    };
  }, []);

  return (
    <div ref={root} className={styles.intro} aria-hidden="true">
      <div className={`${styles.bar} ${styles.top}`} />
      <div className={`${styles.bar} ${styles.bottom}`} />
      <div className={styles.center}>
        <div className={styles.word}>
          {"HXNS".split("").map((l, i) => (
            <span key={i} className={styles.mask}>
              <span className={styles.letter}>{l}</span>
            </span>
          ))}
        </div>
        <div className={`${styles.meta} mono`}>
          <span>{tr(site.concept, locale)}</span>
          <span>
            <span ref={counter}>000</span> / 100
          </span>
        </div>
      </div>
    </div>
  );
}
