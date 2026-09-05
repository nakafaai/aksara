import assert from "node:assert/strict";

import type { SourceRange } from "#nakafa-content/mdx/parse";
import type { StaticStringCandidate } from "#nakafa-content/mdx/static";

const LINE_BOUNDARY_PATTERN = /(\r\n?|\n)/u;
const MDX_CONTINUATION_PREFIX_PATTERN = /^[\t >]*$/u;

/** Reads the source width and cooked UTF-16 width of a validated escape. */
function javascriptEscape(authored: string, index: number) {
  const next = authored[index + 1];
  if (
    next === "\n" ||
    next === "\r" ||
    next === "\u2028" ||
    next === "\u2029"
  ) {
    return {
      characters: 0,
      width: next === "\r" && authored[index + 2] === "\n" ? 3 : 2,
    };
  }
  if (next === "u" && authored[index + 2] === "{") {
    const closing = authored.indexOf("}", index + 3);
    assert.ok(closing !== -1);
    const codePoint = Number.parseInt(authored.slice(index + 3, closing), 16);
    return {
      characters: String.fromCodePoint(codePoint).length,
      width: closing + 1 - index,
    };
  }
  if (next === "u") {
    return { characters: 1, width: 6 };
  }
  return { characters: 1, width: next === "x" ? 4 : 2 };
}

/** Maps validated JavaScript string syntax to its parser-cooked characters. */
function javascriptOffsets(authored: string, sourceStart: number): number[] {
  const offsets: number[] = [];
  for (let index = 0; index < authored.length; ) {
    if (authored[index] === "\\") {
      const { characters, width } = javascriptEscape(authored, index);
      offsets.push(
        ...Array.from({ length: characters }, () => sourceStart + index)
      );
      index += width;
      continue;
    }
    offsets.push(sourceStart + index);
    index += 1;
  }
  return offsets;
}

/** Restores Markdown indentation removed from a parser-owned string token. */
function tokenSourceOffsets(
  raw: string,
  authored: string,
  start: number
): number[] {
  if (raw === authored) {
    return javascriptOffsets(raw, start);
  }
  const rawParts = raw.split(LINE_BOUNDARY_PATTERN);
  const authoredParts = authored.split(LINE_BOUNDARY_PATTERN);
  assert.equal(rawParts.length, authoredParts.length);
  const offsets: number[] = [];
  let sourceStart = start;
  for (let index = 0; index < rawParts.length; index += 2) {
    const line = rawParts[index];
    const sourceLine = authoredParts[index];
    assert.ok(line !== undefined && sourceLine !== undefined);
    assert.ok(sourceLine.endsWith(line));
    const prefix = sourceLine.length - line.length;
    assert.ok(
      MDX_CONTINUATION_PREFIX_PATTERN.test(sourceLine.slice(0, prefix))
    );
    offsets.push(
      ...Array.from(
        { length: line.length },
        (_, column) => sourceStart + prefix + column
      )
    );
    const newline = rawParts[index + 1] ?? "";
    const sourceNewline = authoredParts[index + 1] ?? "";
    offsets.push(
      ...Array.from(
        { length: newline.length },
        () => sourceStart + sourceLine.length
      )
    );
    sourceStart += sourceLine.length + sourceNewline.length;
  }
  return javascriptOffsets(raw, 0).map((position) => {
    const offset = offsets[position];
    assert.ok(offset !== undefined);
    return offset;
  });
}

/** Combines static string parts with exact positions for rendered-copy checks. */
export function renderedStaticStringRange(
  candidate: StaticStringCandidate,
  source: string
) {
  const offsets = candidate.parts.flatMap((part) => {
    const start = part.range.start.offset;
    const end = part.range.end.offset;
    const contentStart = part.quoted ? start + 1 : start;
    const contentEnd = part.quoted ? end - 1 : end;
    const positions = tokenSourceOffsets(
      part.raw,
      source.slice(contentStart, contentEnd),
      contentStart
    );
    assert.equal(positions.length, part.text.length);
    return positions;
  });
  const [first] = candidate.parts;
  const last = candidate.parts.at(-1);
  assert.ok(first && last);
  return {
    end: { offset: last.range.end.offset - (last.quoted ? 1 : 0) },
    rendered: { offsets, text: candidate.text },
    start: { offset: first.range.start.offset + (first.quoted ? 1 : 0) },
  } satisfies SourceRange;
}

/** Selects the exact source position of a match in parser-proven static copy. */
export function sourceOffsetForStaticMatch(
  candidate: StaticStringCandidate,
  renderedOffset: number,
  source: string
): number {
  const offset = renderedStaticStringRange(candidate, source).rendered.offsets[
    renderedOffset
  ];
  assert.ok(offset !== undefined);
  return offset;
}
