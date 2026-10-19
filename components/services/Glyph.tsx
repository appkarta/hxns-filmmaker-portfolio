import type { Service } from "@/lib/types";

/** Small line drawings borrowed from film language: viewfinder, timeline, waveform, grading wheel… */
export default function Glyph({ name, className }: { name: Service["glyph"]; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.2,
    "aria-hidden": true,
  } as const;

  switch (name) {
    case "frame":
      return (
        <svg {...common}>
          <path d="M6 14V6h8M34 6h8v8M42 34v8h-8M14 42H6v-8" />
          <path d="M24 19v10M19 24h10" />
          <circle cx="24" cy="24" r="9" strokeDasharray="2 3" />
        </svg>
      );
    case "timeline":
      return (
        <svg {...common}>
          <rect x="5" y="10" width="14" height="7" />
          <rect x="21" y="10" width="22" height="7" />
          <rect x="5" y="21" width="24" height="7" />
          <rect x="31" y="21" width="12" height="7" />
          <path d="M5 35h38" strokeDasharray="1 3" />
          <path d="M26 6v36" />
        </svg>
      );
    case "brand":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="17" />
          <path d="M24 7v34M7 24h34" strokeDasharray="1 3" />
          <rect x="17" y="17" width="14" height="14" transform="rotate(45 24 24)" />
        </svg>
      );
    case "vertical":
      return (
        <svg {...common}>
          <rect x="15" y="4" width="18" height="40" rx="2" />
          <path d="M21 19l8 5-8 5z" />
          <path d="M19 39h10" />
        </svg>
      );
    case "wave":
      return (
        <svg {...common}>
          {[6, 10, 14, 18, 22, 26, 30, 34, 38, 42].map((x, i) => {
            const h = [6, 14, 22, 10, 30, 18, 26, 12, 20, 8][i];
            return <path key={x} d={`M${x} ${24 - h / 2}v${h}`} />;
          })}
        </svg>
      );
    case "wheel":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="17" />
          <circle cx="24" cy="24" r="10" strokeDasharray="2 3" />
          <circle cx="29" cy="19" r="2.2" fill="currentColor" />
          <path d="M24 4v4M24 40v4M4 24h4M40 24h4" />
        </svg>
      );
  }
}
