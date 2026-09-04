import type { StaticStringCandidate } from "#nakafa-content/mdx/static";

/** Locates a rendered match in its authored part, with a stable fallback. */
export function sourceOffsetForStaticMatch(
  candidate: StaticStringCandidate,
  renderedOffset: number,
  matchText: string,
  source: string
): number | undefined {
  let consumed = 0;
  for (const part of candidate.parts) {
    const partEnd = consumed + part.text.length;
    if (renderedOffset < partEnd || part.text.length === 0) {
      const start = part.range?.start?.offset;
      const end = part.range?.end?.offset;
      if (start === undefined || end === undefined) {
        return;
      }
      const localOffset = Math.max(0, renderedOffset - consumed);
      const renderedFragment = part.text.slice(
        localOffset,
        localOffset + matchText.length
      );
      const authored = source.slice(start, end);
      const exactOffset = authored.indexOf(renderedFragment || matchText);
      return exactOffset === -1 ? start : start + exactOffset;
    }
    consumed = partEnd;
  }
  return candidate.parts[0]?.range?.start?.offset;
}
