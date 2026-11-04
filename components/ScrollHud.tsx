"use client";

import { useEffect, useRef } from "react";
import { timecode } from "@/lib/asset";
import { ui, type Locale } from "@/lib/i18n";
import styles from "./ScrollHud.module.css";

const SECTION_IDS = ["top", "work", "about", "contact"];

/** The page reads like a timeline: scroll progress bar + running timecode + current "scene". */
export default function ScrollHud({ locale }: { locale: Locale }) {
  const scenes = ui[locale].scenes;
  const bar = useRef<HTMLDivElement>(null);
  const tc = useRef<HTMLSpanElement>(null);
  const scene = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    let lastTc = "";
    const RUNTIME = 180; // the whole page = a 3-minute film
    // Section positions are measured once (and when the layout changes), not on every scroll frame
    let tops: number[] = [];
    let max = 0;
    const measure = () => {
      tops = SECTION_IDS.map((id) => {
        const el = document.getElementById(id);
        return el ? el.getBoundingClientRect().top + window.scrollY : Infinity;
      });
      max = document.documentElement.scrollHeight - window.innerHeight;
    };
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      const nextTc = timecode(p * RUNTIME);
      if (tc.current && nextTc !== lastTc) tc.current.textContent = lastTc = nextTc;
      if (scene.current) {
        const mid = y + window.innerHeight * 0.45;
        let label = scenes[0];
        tops.forEach((top, i) => {
          if (top <= mid) label = scenes[i];
        });
        if (scene.current.textContent !== label) scene.current.textContent = label;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    measure();
    update();
    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [scenes]);

  return (
    <div className={styles.hud} aria-hidden="true">
      <div ref={bar} className={styles.bar} />
      <div className={`${styles.readout} mono`}>
        <span className={styles.tcLabel}>TC</span>
        <span ref={tc}>00:00:00:00</span>
      </div>
      <div className={`${styles.scene} mono`}>
        <span ref={scene}>{scenes[0]}</span>
      </div>
    </div>
  );
}
