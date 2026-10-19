import { RootDocument, buildMetadata } from "@/lib/document";

export { viewport } from "@/lib/document";
export const metadata = buildMetadata("en");

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
