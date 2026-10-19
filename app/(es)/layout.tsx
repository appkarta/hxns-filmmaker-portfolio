import { RootDocument, buildMetadata } from "@/lib/document";

export { viewport } from "@/lib/document";
export const metadata = buildMetadata("es");

export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="es">{children}</RootDocument>;
}
