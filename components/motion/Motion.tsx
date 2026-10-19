"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { scrollToTarget, setLenis } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger, SplitText);

const PLAY_ONCE = "play none none none";

/**
 * One place for all scroll-driven motion:
 *  - Lenis smooth scroll (desktop pointers, skipped for reduced motion)
 *  - declarative reveals via data attributes:
 *      data-reveal="lines" | "fade" | "stagger" | "media"
 *      data-parallax="0.15"   (moves the first child)
 *      data-scrub="words"     (word-by-word light-up while scrolling)
 *      data-count="8"         (counts up from 0)
 */
export default function Motion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | null = null;

    if (!reduce) {
      lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      (lenis as Lenis & { __raf?: typeof raf }).__raf = raf;
    }

    // In-page anchors → smooth scroll + move focus for keyboard / screen reader users
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href") ?? "";
      if (hash.length < 2 || hash.startsWith("#work/")) return;
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      e.preventDefault();
      scrollToTarget(target);
      history.replaceState(null, "", hash);
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);

    const mm = gsap.matchMedia();
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled) return;
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Masked line reveals
        gsap.utils.toArray<HTMLElement>('[data-reveal="lines"]').forEach((el) => {
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            linesClass: "split-line",
            onSplit(self) {
              return gsap.from(self.lines, {
                yPercent: 112,
                duration: 1.25,
                ease: "expo.out",
                stagger: 0.09,
                // Play once, never reverse. (`once: true` makes triggers delete themselves during ScrollTrigger.refresh,
                // which throws when the page loads already scrolled, e.g. /#services.)
                scrollTrigger: { trigger: el, start: "top 86%", toggleActions: PLAY_ONCE },
              });
            },
          });
        });

        gsap.utils.toArray<HTMLElement>('[data-reveal="fade"]').forEach((el) => {
          gsap.from(el, {
            y: 36,
            autoAlpha: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", toggleActions: PLAY_ONCE },
          });
        });

        gsap.utils.toArray<HTMLElement>('[data-reveal="stagger"]').forEach((el) => {
          gsap.from(el.children, {
            y: 28,
            autoAlpha: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.07,
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: PLAY_ONCE },
          });
        });

        // Media: shutter-like clip reveal + settle
        gsap.utils.toArray<HTMLElement>('[data-reveal="media"]').forEach((el) => {
          const inner = el.firstElementChild;
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 88%", toggleActions: PLAY_ONCE } });
          tl.fromTo(el, { clipPath: "inset(18% 8% 18% 8%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.out" });
          if (inner) tl.fromTo(inner, { scale: 1.22 }, { scale: 1, duration: 1.8, ease: "expo.out" }, 0);
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const amount = parseFloat(el.dataset.parallax || "0.12") * 100;
          const inner = el.firstElementChild;
          if (!inner) return;
          gsap.fromTo(
            inner,
            { yPercent: -amount / 2 },
            { yPercent: amount / 2, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });

        gsap.utils.toArray<HTMLElement>('[data-scrub="words"]').forEach((el) => {
          SplitText.create(el, {
            type: "words",
            autoSplit: true,
            onSplit(self) {
              return gsap.fromTo(
                self.words,
                { opacity: 0.16 },
                {
                  opacity: 1,
                  ease: "none",
                  stagger: 0.1,
                  scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 50%", scrub: true },
                },
              );
            },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const to = parseInt(el.dataset.count || "0", 10);
          const obj = { v: 0 };
          gsap.to(obj, {
            v: to,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = String(Math.round(obj.v)).padStart(2, "0");
            },
            scrollTrigger: { trigger: el, start: "top 90%", toggleActions: PLAY_ONCE },
          });
        });
      });
      ScrollTrigger.refresh();
    });

    // Late media / font loads shift layout — keep triggers honest
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      cancelled = true;
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", onLoad);
      mm.revert();
      if (lenis) {
        const raf = (lenis as Lenis & { __raf?: (t: number) => void }).__raf;
        if (raf) gsap.ticker.remove(raf);
        lenis.destroy();
        setLenis(null);
      }
    };
  }, []);

  return null;
}
