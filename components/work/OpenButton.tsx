"use client";

import { ArrowUpRight } from "lucide-react";
import { usePlayer } from "@/components/player/PlayerProvider";
import styles from "./Work.module.css";

export default function OpenButton({ id, label }: { id: string; label: string }) {
  const { open } = usePlayer();
  return (
    <button type="button" className={`${styles.view} mono`} onClick={() => open(id)}>
      {label} <ArrowUpRight aria-hidden="true" />
    </button>
  );
}
