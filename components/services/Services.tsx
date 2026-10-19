"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { services } from "@/site.config";
import { asset, pad2 } from "@/lib/asset";
import { tr, ui, type Locale } from "@/lib/i18n";
import AccentTitle from "../AccentTitle";
import Glyph from "./Glyph";
import styles from "./Services.module.css";

export default function Services({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const list = useRef<HTMLDivElement>(null);
  const float = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState<number | null>(null);

  // A floating still follows the pointer across the list (desktop only)
  useEffect(() => {
    const el = float.current;
    const ul = list.current;
    if (!el || !ul) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const x = gsap.quickTo(el, "x", { duration: reduce ? 0 : 0.6, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: reduce ? 0 : 0.6, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = ul.getBoundingClientRect();
      x(e.clientX - r.left);
      y(e.clientY - r.top);
    };
    ul.addEventListener("pointermove", move);
    return () => ul.removeEventListener("pointermove", move);
  }, []);

  return (
    <section id="services" className={styles.section} aria-labelledby="services-title">
      <div className={`container ${styles.head}`}>
        <p className="section-label mono" data-reveal="fade">
          {t.servicesLabel}
        </p>
        <h2 id="services-title" className="display">
          <span data-reveal="lines">
            <AccentTitle parts={t.servicesTitle} />
          </span>
        </h2>
        <p className={styles.lead} data-reveal="fade">
          {t.servicesLead}
        </p>
      </div>

      <div ref={list} className={`container ${styles.listWrap}`} onPointerLeave={() => setCurrent(null)}>
        <ol className={styles.list}>
        {services.map((s, i) => (
          <li
            key={s.title.en}
            className={`${styles.row} ${current === i ? styles.on : ""}`}
            onPointerEnter={() => setCurrent(i)}
            data-reveal="fade"
          >
            <span className={`${styles.num} mono`}>{pad2(i + 1)}</span>
            <h3 className={styles.name}>{tr(s.title, locale)}</h3>
            <p className={styles.desc}>{tr(s.description, locale)}</p>
            <div className={styles.detail}>
              <Glyph name={s.glyph} className={styles.glyph} />
              <span className="mono dim">{tr(s.detail, locale)}</span>
            </div>
          </li>
        ))}
        </ol>

        <div ref={float} className={`${styles.float} ${current !== null ? styles.floatOn : ""}`} aria-hidden="true">
          {services.map((s, i) => (
            <div key={s.title.en} className={`${styles.floatImg} ${current === i ? styles.floatCurrent : ""}`}>
              <Image src={asset(s.image)} alt="" fill sizes="320px" className={styles.img} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
