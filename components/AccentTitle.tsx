/** Heading text with one italic serif accent: ["Behind", "the", "lens"] → Behind <i>the</i> lens */
export default function AccentTitle({ parts }: { parts: [string, string, string] }) {
  const [before, accent, after] = parts;
  return (
    <>
      {before}
      {before && " "}
      <span className="serif">{accent}</span>
      {after && ` ${after}`}
    </>
  );
}
