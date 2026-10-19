"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./Cursor.module.css";

/** Desktop-only cursor: a small dot that opens into a "Play" lens over films. */
export default function Cursor() {
  const el = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"" | "play" | "link">("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const check = () => setEnabled(fine.matches && !reduce.matches);
    check();
    fine.addEventListener("change", check);
    reduce.addEventListener("change", check);
    return () => {
      fine.removeEventListener("change", check);
      reduce.removeEventListener("change", check);
    };
  }, []);

  useEffect(() => {
    const node = el.current;
    if (!enabled || !node) return;
    document.documentElement.classList.add("has-cursor");
    const x = gsap.quickTo(node, "x", { duration: 0.35, ease: "power3.out" });
    const y = gsap.quickTo(node, "y", { duration: 0.35, ease: "power3.out" });
    let shown = false;

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!shown) {
        gsap.set(node, { x: e.clientX, y: e.clientY });
        node.style.opacity = "1";
        shown = true;
      }
      x(e.clientX);
      y(e.clientY);
      const t = e.target as HTMLElement;
      if (t.closest('[data-cursor="play"]')) setMode("play");
      else if (t.closest("a, button, input, [role='button']")) setMode("link");
      else setMode("");
    };
    const leave = () => {
      node.style.opacity = "0";
      shown = false;
    };
    // Layout changes under a still pointer (e.g. opening the player) → reset the lens
    const reset = () => setMode("");
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("click", reset);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("click", reset);
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div ref={el} className={`${styles.cursor} ${mode ? styles[mode] : ""}`} aria-hidden="true">
      <span className={`${styles.label} mono`}>Play</span>
    </div>
  );
}
