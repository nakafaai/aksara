import type { SourceRange } from "#nakafa-content/mdx/parse";
import type { LessonVoiceIssue } from "#nakafa-content/voice/types";

const ENTITY_TERMINATOR_PATTERN = /&(?:#[0-9]+|#x[0-9a-f]+|[a-z][a-z0-9]+);$/iu;
const SEMICOLON_ENTITY_PATTERN = /&(?:#0*59|#x0*3b|semi);$/iu;

export interface SemicolonScanOptions {
  allowLatexSpacing?: boolean;
}

/** Classifies an entity terminator at one authored semicolon. */
function entityTerminatorKind(
  source: string,
  offset: number
): "other" | "semicolon" | undefined {
  const candidate = source.slice(Math.max(0, offset - 20), offset + 1);
  if (SEMICOLON_ENTITY_PATTERN.test(candidate)) {
    return "semicolon";
  }
  return ENTITY_TERMINATOR_PATTERN.test(candidate) ? "other" : undefined;
}

/** Adds visible semicolons found in one exact authored source range. */
export function addSemicolonsInRange(
  offsets: Set<number>,
  source: string,
  range: SourceRange | undefined,
  options: SemicolonScanOptions = {}
): void {
  const start = range?.start?.offset;
  const end = range?.end?.offset;
  if (start === undefined || end === undefined) {
    return;
  }
  for (let offset = start; offset < end; offset += 1) {
    if (source[offset] !== ";") {
      continue;
    }
    if (options.allowLatexSpacing && source[offset - 1] === "\\") {
      continue;
    }
    if (entityTerminatorKind(source, offset) === "other") {
      continue;
    }
    offsets.add(offset);
  }
}

/** Builds a source expression that accepts authored semicolon entities. */
function encodedFieldPattern(value: string): RegExp {
  const encodedSemicolon = "(?:;|&(?:#0*59|#[xX]0*3[bB]|[sS][eE][mM][iI]);)";
  return new RegExp(
    value
      .split(";")
      .map((part) => part.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&"))
      .join(encodedSemicolon),
    "gu"
  );
}

/** Locates a static Markdown alt or title string inside one node range. */
export function addStaticMarkdownFieldSemicolons(
  offsets: Set<number>,
  source: string,
  range: SourceRange | undefined,
  value: string | undefined
): void {
  const start = range?.start?.offset;
  const end = range?.end?.offset;
  if (start === undefined || end === undefined || !value?.includes(";")) {
    return;
  }
  const sourceRange = source.slice(start, end);
  let localOffset = sourceRange.indexOf(value);
  let sourceLength = value.length;
  if (localOffset === -1) {
    const pattern = encodedFieldPattern(value);
    for (const encodedMatch of sourceRange.matchAll(pattern)) {
      localOffset = encodedMatch.index;
      sourceLength = encodedMatch[0].length;
      break;
    }
  }
  if (localOffset === -1) {
    return;
  }
  addSemicolonsInRange(offsets, source, {
    end: { offset: start + localOffset + sourceLength },
    start: { offset: start + localOffset },
  });
}

/** Converts one absolute source offset to the standard lesson issue shape. */
export function semicolonIssueAtOffset(
  source: string,
  offset: number
): LessonVoiceIssue {
  const lineStart = source.lastIndexOf("\n", offset - 1) + 1;
  const lineEndIndex = source.indexOf("\n", offset);
  const lineEnd = lineEndIndex === -1 ? source.length : lineEndIndex;
  let line = 1;
  for (let index = 0; index < lineStart; index += 1) {
    if (source.charCodeAt(index) === 10) {
      line += 1;
    }
  }
  return {
    column: offset - lineStart + 1,
    excerpt: source.slice(lineStart, lineEnd).trim(),
    line,
    rule: "learner-facing-semicolon",
  };
}
