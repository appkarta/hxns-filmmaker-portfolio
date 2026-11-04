"use client";

import { useEffect } from "react";

/** Client-side hop (keeps #work/… links) for old URLs. */
export default function LegacyRedirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.replace(to + window.location.hash);
  }, [to]);
  return null;
}
