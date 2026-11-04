import { projects } from "@/data/projects";
import { workCategories } from "./i18n";
import type { Aspect, Project, WorkCategory } from "./types";

/** Default shape per category when a project doesn't set one */
export function aspectOf(p: Project): Aspect {
  return p.aspect ?? (p.category === "vertical" ? "9:16" : "16:9");
}

export function isVertical(aspect: Aspect) {
  return aspect === "9:16" || aspect === "4:5";
}

/** Projects of one category, featured first, otherwise in the order of data/projects.ts */
export function projectsIn(category: WorkCategory): Project[] {
  const list = projects.filter((p) => p.category === category);
  return [...list.filter((p) => p.featured), ...list.filter((p) => !p.featured)];
}

/** Categories in display order: the ones with work first, empty ones last */
export function categoriesInDisplayOrder() {
  const withWork = workCategories.filter((c) => projectsIn(c.id).length > 0);
  const empty = workCategories.filter((c) => projectsIn(c.id).length === 0);
  return [...withWork, ...empty];
}

/** Every project in the order it appears on the page (used by the player's previous / next) */
export const orderedProjects: Project[] = categoriesInDisplayOrder().flatMap((c) => projectsIn(c.id));

export type ParsedMedia =
  | { kind: "mp4"; src: string }
  | { kind: "youtube"; id: string }
  | { kind: "vimeo"; id: string }
  | { kind: "images"; images: string[] };

export function parseMedia(p: Project): ParsedMedia {
  if (p.mediaType === "image") return { kind: "images", images: [p.media, ...(p.gallery ?? [])] };
  if (p.media.startsWith("youtube:")) return { kind: "youtube", id: p.media.slice(8) };
  if (p.media.startsWith("vimeo:")) return { kind: "vimeo", id: p.media.slice(6) };
  return { kind: "mp4", src: p.media };
}
