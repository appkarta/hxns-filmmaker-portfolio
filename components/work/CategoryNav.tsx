"use client";

import { useEffect, useState } from "react";
import { pad2 } from "@/lib/asset";
import styles from "./Work.module.css";

type Item = { id: string; label: string; count: number };

/** Vertical · Horizontal · Brands · Personal — sticky chips that follow the reader through Work. */
export default function CategoryNav({ items, label }: { items: Item[]; label: string }) {
  const [current, setCurrent] = useState(items[0]?.id);

  useEffect(() => {
    const blocks = items.map((i) => document.getElementById(`work-${i.id}`)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setCurrent(visible[0].target.id.replace("work-", ""));
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    blocks.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className={styles.catNav} aria-label={label}>
      <ul>
        {items.map((i) => (
          <li key={i.id}>
            <a href={`#work-${i.id}`} className={`${styles.chip} ${current === i.id ? styles.chipOn : ""}`} aria-current={current === i.id ? "true" : undefined}>
              {i.label}
              <span className={`mono ${styles.chipCount}`}>{pad2(i.count)}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
