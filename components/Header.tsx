"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/site.config";
import { lockScroll, scrollToTarget, unlockScroll } from "@/lib/scroll";
import { pad2 } from "@/lib/asset";
import styles from "./Header.module.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Hide on scroll down, reveal on scroll up
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > window.innerHeight * 0.6);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 240);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock scroll, trap focus, close on Escape
  useEffect(() => {
    if (!open) return;
    lockScroll();
    const menu = menuRef.current;
    menu?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && menu) {
        const items = [toggleRef.current, ...Array.from(menu.querySelectorAll<HTMLElement>("a"))].filter(Boolean) as HTMLElement[];
        const first = items[0];
        const lastItem = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          lastItem.focus();
        } else if (!e.shiftKey && document.activeElement === lastItem) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [open]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    // wait one frame so the scroll lock is released first
    requestAnimationFrame(() => {
      scrollToTarget(href);
      history.replaceState(null, "", href);
    });
  };

  return (
    <header
      className={`${styles.header} ${hidden && !open ? styles.hidden : ""} ${solid ? styles.solid : ""} ${open ? styles.isOpen : ""}`}
    >
      <div className={styles.inner}>
        <a href="#top" className={styles.logo} aria-label={`${site.name} — back to top`} onClick={(e) => go(e, "#top")}>
          HXNS<sup>®</sup>
        </a>

        <nav className={styles.nav} aria-label="Primary">
          <ul>
            {site.nav.map((item, i) => (
              <li key={item.href}>
                <a href={item.href} className={styles.link}>
                  <span className={styles.num}>{pad2(i + 1)}</span>
                  <span className={styles.label} data-text={item.label}>
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.right}>
          {site.availability.open && (
            <span className={`${styles.status} mono`}>
              <span className="dot" aria-hidden="true" />
              {site.availability.label}
            </span>
          )}
          <a href="#contact" className={`${styles.talk} mono`}>
            Let&apos;s talk
          </a>
          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className={styles.toggleLabel} aria-hidden="true">
              {open ? "Close" : "Menu"}
            </span>
            <span className={styles.burger} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div id="mobile-menu" ref={menuRef} className={styles.menu} hidden={!open}>
        <nav aria-label="Mobile">
          <ul>
            {site.nav.map((item, i) => (
              <li key={item.href} style={{ "--i": i } as React.CSSProperties}>
                <a href={item.href} onClick={(e) => go(e, item.href)}>
                  <span className="mono dim">{pad2(i + 1)}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={`${styles.menuFoot} mono dim`}>
          {site.availability.open && (
            <span className={styles.status}>
              <span className="dot" aria-hidden="true" /> {site.availability.label}
            </span>
          )}
          <span>{site.concept}</span>
        </div>
      </div>
    </header>
  );
}
