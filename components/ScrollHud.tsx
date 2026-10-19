"use client";

import { useEffect, useRef } from "react";
import { timecode } from "@/lib/asset";
import { ui, type Locale } from "@/lib/i18n";
import styles from "./ScrollHud.module.css";

const SECTION_IDS = ["top", "work", "about", "services", "archive", "contact"];

/** The page reads like a timeline: scroll progress bar + running timecode + current "scene". */
export default function ScrollHud({ locale }: { locale: Locale }) {
  const scenes = ui[locale].scenes;
  const bar = useRef<HTMLDivElement>(null);
  const tc = useRef<HTMLSpanElement>(null);
  const scene = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const RUNTIME = 180; // the whole page = a 3-minute film
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      if (tc.current) tc.current.textContent = timecode(p * RUNTIME);
      if (scene.current) {
        const mid = window.innerHeight * 0.45;
        let label = scenes[0];
        SECTION_IDS.forEach((id, i) => {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= mid) label = scenes[i];
        });
        if (scene.current.textContent !== label) scene.current.textContent = label;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
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
