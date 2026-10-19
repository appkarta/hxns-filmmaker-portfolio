"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Current year, rendered at build time and refreshed in the browser. */
export default function Year() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => BUILD_YEAR,
  );
  return <>{year}</>;
}

const BUILD_YEAR = new Date().getFullYear();
