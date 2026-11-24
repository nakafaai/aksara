const MATH_CONTAINER_LINE = /^[ \t]*<\/?MathContainer>[ \t]*\n?/gmu;
const ADJACENT_BLOCK_MATH_GAP = /\/>\n+(?=<BlockMath\b)/gu;

/**
 * Strips `<MathContainer>` wrapper lines and collapses blank lines between
 * adjacent `<BlockMath />` rows so two versions can be compared for
 * wrapper-only layout edits.
 */
export function withoutMathContainers(source: string): string {
  return source
    .replace(MATH_CONTAINER_LINE, "")
    .replace(ADJACENT_BLOCK_MATH_GAP, "/>\n");
}

/**
 * Whether a change to one document only wraps consecutive `<BlockMath />` rows
 * in `<MathContainer>` without altering any authored prose, headings, visuals,
 * or formula text. Such a structural migration keeps untouched legacy answers
 * out of diff-scoped editorial gates until a real revision touches them.
 */
export function wrapsMathStackOnly(base: string, head: string): boolean {
  return (
    base !== head && withoutMathContainers(base) === withoutMathContainers(head)
  );
}
