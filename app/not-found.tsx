import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lost frame — HXNS®",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="nf-page">
      <p className="mono dim">Error 404 — Frame not found</p>
      <h1 className="nf-code">
        4<span className="serif">0</span>4
      </h1>
      <p className="nf-text">This shot didn&apos;t make the final cut.</p>
      <Link href="/" className="btn btn--solid">
        Back to the reel
      </Link>
      <div className="grain" aria-hidden="true" />
    </main>
  );
}
