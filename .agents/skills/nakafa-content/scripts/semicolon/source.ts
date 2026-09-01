import type { SourceRange } from "#nakafa-content/voice-mdx";
import type { LessonVoiceIssue } from "#nakafa-content/voice-types";

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

/** Maps a decoded field value back to its authored entity-aware source length. */
function decodedFieldSourceLength(
  authored: string,
  decoded: string
): number | undefined {
  let sourceOffset = 0;
  for (const character of decoded) {
    if (character !== ";" || authored[sourceOffset] === ";") {
      if (!authored.startsWith(character, sourceOffset)) {
        return;
      }
      sourceOffset += character.length;
      continue;
    }
    const terminatorOffset = authored.indexOf(";", sourceOffset);
    if (
      terminatorOffset === -1 ||
      entityTerminatorKind(authored, terminatorOffset) !== "semicolon"
    ) {
      return;
    }
    sourceOffset = terminatorOffset + 1;
  }
  return sourceOffset;
}

/** Builds a source expression that accepts authored semicolon entities. */
function encodedFieldPattern(value: string): RegExp {
  const encodedSemicolon = "(?:;|&(?:#0*59|#x0*3b|semi);)";
  return new RegExp(
    value
      .split(";")
      .map((part) => part.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&"))
      .join(encodedSemicolon),
    "iu"
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
    localOffset = sourceRange.search(encodedFieldPattern(value));
    if (localOffset === -1) {
      return;
    }
    const decodedSourceLength = decodedFieldSourceLength(
      sourceRange.slice(localOffset),
      value
    );
    if (decodedSourceLength === undefined) {
      return;
    }
    sourceLength = decodedSourceLength;
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
