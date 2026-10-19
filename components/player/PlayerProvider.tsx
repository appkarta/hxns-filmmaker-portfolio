"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { projects } from "@/site.config";
import type { Locale } from "@/lib/i18n";
import PlayerModal from "./PlayerModal";

type PlayerCtx = { open: (slug: string) => void };

const Ctx = createContext<PlayerCtx>({ open: () => {} });
export const usePlayer = () => useContext(Ctx);

const HASH = "#work/";

/** Holds which project is open and keeps it in the URL (#work/<slug>) so it can be shared. */
export default function PlayerProvider({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  const [index, setIndex] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const pushed = useRef(false);

  const indexFromHash = () => {
    const h = decodeURIComponent(window.location.hash);
    if (!h.startsWith(HASH)) return null;
    const i = projects.findIndex((p) => p.slug === h.slice(HASH.length));
    return i >= 0 ? i : null;
  };

  // Deep link + back button support
  useEffect(() => {
    const sync = () => setIndex(indexFromHash());
    const first = requestAnimationFrame(sync); // open a shared #work/<slug> link
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      cancelAnimationFrame(first);
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  const open = useCallback((slug: string) => {
    const i = projects.findIndex((p) => p.slug === slug);
    if (i < 0) return;
    opener.current = document.activeElement as HTMLElement | null;
    history.pushState({ hxnsPlayer: true }, "", `${HASH}${slug}`);
    pushed.current = true;
    setIndex(i);
  }, []);

  const go = useCallback((dir: 1 | -1) => {
    setIndex((cur) => {
      if (cur === null) return cur;
      const next = (cur + dir + projects.length) % projects.length;
      history.replaceState(history.state, "", `${HASH}${projects[next].slug}`);
      return next;
    });
  }, []);

  const close = useCallback(() => {
    if (pushed.current && history.state?.hxnsPlayer) {
      pushed.current = false;
      history.back(); // popstate clears the index
    } else {
      history.replaceState(null, "", window.location.pathname + window.location.search + "#work");
    }
    setIndex(null);
    requestAnimationFrame(() => opener.current?.focus({ preventScroll: true }));
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <Ctx.Provider value={value}>
      {children}
      {index !== null && (
        <PlayerModal
          locale={locale}
          project={projects[index]}
          index={index}
          total={projects.length}
          prev={projects[(index - 1 + projects.length) % projects.length]}
          next={projects[(index + 1) % projects.length]}
          onPrev={() => go(-1)}
          onNext={() => go(1)}
          onClose={close}
        />
      )}
    </Ctx.Provider>
  );
}
