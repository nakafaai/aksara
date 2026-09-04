const PROTECTED_INLINE_PATTERNS = [
  /<CodeBlock\b[^>]*(?:\/>|>.*?<\/CodeBlock>)/gu,
  /<(?:InlineMath|BlockMath)\b[^>]*\/>/gu,
  /`[^`\n]+`/gu,
  /!?\[[^\]\n]*\]\([^)\n]+\)/gu,
  /\b\w+\s*=\s*(?:"[^"]*"|'[^']*')/gu,
];
const INLINE_QUOTATION_PATTERNS = [
  /"[^"\n]*"/gu,
  /“[^”\n]*”/gu,
  /„[^“\n]*“/gu,
  /«[^»\n]*»/gu,
  /»[^«\n]*«/gu,
  /‘[^’\n]*’/gu,
  /‚[^‘\n]*‘/gu,
  /‹[^›\n]*›/gu,
  /›[^‹\n]*‹/gu,
];
const MULTILINE_QUOTATION_PAIRS = [
  { close: "”", open: "“" },
  { close: "“", open: "„" },
  { close: "»", open: "«" },
  { close: "«", open: "»" },
  { close: "’", open: "‘" },
  { close: "‘", open: "‚" },
  { close: "›", open: "‹" },
  { close: "‹", open: "›" },
] as const;
const STRAIGHT_QUOTE = '"';
const WHITESPACE_CHARACTER_PATTERN = /\s/u;
const STRAIGHT_QUOTE_CLOSE_FOLLOW_PATTERN = /[\s.,!?;:)\]}>]/u;
const STRAIGHT_QUOTE_OPEN_PRECEDE_PATTERN = /[\s([{>:]/u;

export interface InlineQuotationRange {
  end: number;
  start: number;
}

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

/** Masks quoted examples so author-voice rules do not rewrite other speakers. */
export function maskInlineQuotations(line: string): string {
  const characters = line.split("");
  for (const pattern of INLINE_QUOTATION_PATTERNS) {
    for (const match of line.matchAll(pattern)) {
      if (match.index === undefined) {
        continue;
      }
      characters.fill(" ", match.index, match.index + match[0].length);
    }
  }
  return characters.join("");
}

/** Finds balanced asymmetric quotations without borrowing a later opening. */
function asymmetricQuotationRanges(
  source: string,
  pair: (typeof MULTILINE_QUOTATION_PAIRS)[number]
): InlineQuotationRange[] {
  const ranges: InlineQuotationRange[] = [];
  let cursor = 0;
  while (cursor < source.length) {
    const openIndex = source.indexOf(pair.open, cursor);
    if (openIndex === -1) {
      break;
    }
    const closeIndex = source.indexOf(pair.close, openIndex + pair.open.length);
    if (closeIndex === -1) {
      cursor = openIndex + pair.open.length;
      continue;
    }
    const nestedOpen = source.indexOf(pair.open, openIndex + pair.open.length);
    if (nestedOpen !== -1 && nestedOpen < closeIndex) {
      cursor = nestedOpen;
      continue;
    }
    if (source.slice(openIndex, closeIndex).includes("\n")) {
      const end = closeIndex + pair.close.length;
      ranges.push({ end, start: openIndex });
      cursor = end;
      continue;
    }
    cursor = closeIndex + pair.close.length;
  }
  return ranges;
}

/** Returns true when a straight source quote is not escaped. */
function isUnescapedStraightQuote(source: string, index: number): boolean {
  if (source[index] !== STRAIGHT_QUOTE) {
    return false;
  }
  let slashCount = 0;
  for (
    let slashIndex = index - 1;
    slashIndex >= 0 && source[slashIndex] === "\\";
    slashIndex -= 1
  ) {
    slashCount += 1;
  }
  return slashCount % 2 === 0;
}

/** Classifies a straight quote by its neighboring visible characters. */
function straightQuoteRole(
  source: string,
  index: number
): { closes: boolean; opens: boolean } {
  const previous = source[index - 1] ?? "";
  const next = source[index + 1] ?? "";
  return {
    closes:
      previous.length > 0 &&
      !WHITESPACE_CHARACTER_PATTERN.test(previous) &&
      (next.length === 0 || STRAIGHT_QUOTE_CLOSE_FOLLOW_PATTERN.test(next)),
    opens:
      (previous.length === 0 ||
        STRAIGHT_QUOTE_OPEN_PRECEDE_PATTERN.test(previous)) &&
      next.length > 0 &&
      !WHITESPACE_CHARACTER_PATTERN.test(next),
  };
}

/** Finds balanced straight quotations that cross one or more source lines. */
function straightMultilineQuotationRanges(
  source: string
): InlineQuotationRange[] {
  const ranges: InlineQuotationRange[] = [];
  let openIndex: number | undefined;
  for (let index = 0; index < source.length; index += 1) {
    if (!isUnescapedStraightQuote(source, index)) {
      continue;
    }
    const role = straightQuoteRole(source, index);
    if (openIndex === undefined) {
      if (role.opens) {
        openIndex = index;
      }
      continue;
    }
    if (role.opens && !role.closes) {
      openIndex = index;
      continue;
    }
    if (!role.closes) {
      continue;
    }
    if (source.slice(openIndex, index).includes("\n")) {
      ranges.push({ end: index + 1, start: openIndex });
    }
    openIndex = undefined;
  }
  return ranges;
}

/** Finds balanced quotations that cross source lines or paragraphs. */
export function multilineQuotationRanges(
  source: string
): InlineQuotationRange[] {
  return [
    ...MULTILINE_QUOTATION_PAIRS.flatMap((pair) =>
      asymmetricQuotationRanges(source, pair)
    ),
    ...straightMultilineQuotationRanges(source),
  ].sort((left, right) => left.start - right.start);
}

/** Masks balanced multiline quote ranges while preserving source columns. */
export function maskMultilineQuotations(
  line: string,
  lineOffset: number,
  ranges: readonly InlineQuotationRange[]
): string {
  const characters = line.split("");
  const lineEnd = lineOffset + line.length;
  for (const range of ranges) {
    if (range.end <= lineOffset || range.start >= lineEnd) {
      continue;
    }
    characters.fill(
      " ",
      Math.max(0, range.start - lineOffset),
      Math.min(line.length, range.end - lineOffset)
    );
  }
  return characters.join("");
}

/** Masks every balanced inline or multiline quotation in one visible range. */
export function maskBalancedQuotations(source: string): string {
  const characters = source.split("");
  for (const { end, start } of multilineQuotationRanges(source)) {
    characters.fill(" ", start, end);
  }
  return maskInlineQuotations(characters.join(""));
}

/** Finds source-string quotes while respecting escaped quote characters. */
function sourceStringQuoteIndexes(line: string): number[] {
  const indexes: number[] = [];
  for (let index = 0; index < line.length; index += 1) {
    if (line[index] !== '"') {
      continue;
    }
    let slashCount = 0;
    for (
      let slashIndex = index - 1;
      slashIndex >= 0 && line[slashIndex] === "\\";
      slashIndex -= 1
    ) {
      slashCount += 1;
    }
    if (slashCount % 2 === 0) {
      indexes.push(index);
    }
  }
  return indexes;
}

/** Masks real quotations inside a metadata string but keeps its outer syntax. */
export function maskMetadataDescriptionQuotations(line: string): string {
  const quoteIndexes = sourceStringQuoteIndexes(line);
  const start = quoteIndexes.at(0);
  const end = quoteIndexes.at(-1);
  if (start === undefined || end === undefined || start === end) {
    return line;
  }
  const contentStart = start + 1;
  const content = line.slice(contentStart, end);
  const maskedContent = maskInlineQuotations(content);
  return `${line.slice(0, contentStart)}${maskedContent}${line.slice(end)}`;
}
