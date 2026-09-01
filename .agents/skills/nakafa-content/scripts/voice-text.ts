const PROTECTED_INLINE_PATTERNS = [
  /<CodeBlock\b[^>]*(?:\/>|>.*?<\/CodeBlock>)/gu,
  /<(?:InlineMath|BlockMath)\b[^>]*\/>/gu,
  /`[^`\n]+`/gu,
  /!?\[[^\]\n]*\]\([^)\n]+\)/gu,
  /\b\w+\s*=\s*(?:"[^"]*"|'[^']*')/gu,
];

/** Finds inline MDX ranges whose code or math must not be prose-linted. */
export function protectedInlineRanges(line: string): Array<{
  end: number;
  start: number;
}> {
  return PROTECTED_INLINE_PATTERNS.flatMap((pattern) =>
    [...line.matchAll(pattern)].flatMap((match) => {
      if (match.index === undefined) {
        return [];
      }
      return [
        {
          end: match.index + match[0].length,
          start: match.index,
        },
      ];
    })
  );
}

/** Replaces protected inline MDX with spaces while preserving issue columns. */
export function maskProtectedInlineContent(line: string): string {
  const characters = line.split("");
  for (const { end, start } of protectedInlineRanges(line)) {
    characters.fill(" ", start, end);
  }
  return characters.join("");
}
