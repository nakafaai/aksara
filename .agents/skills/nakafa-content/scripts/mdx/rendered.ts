import assert from "node:assert/strict";

import type {
  MdxAttribute,
  MdxNode,
  SourceRange,
} from "#nakafa-content/mdx/parse";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";

const ENTITY_PATTERN = /&(?:#[xX][\dA-Fa-f]+|#\d+|[A-Za-z][A-Za-z\d]+);/uy;
const ESCAPABLE_CHARACTER_PATTERN = /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/u;
const ENTITY_VALUES = new Map<string, string>();
const MARKDOWN_CONTINUATION_PREFIX_PATTERN = /^(?:[\t ]|>[\t ]?)+$/u;
const MARKDOWN_CONTINUATION_PREFIX_START_PATTERN = /^(?:[\t ]|>[\t ]?)+/u;
const NON_WHITESPACE_PATTERN = /\S/u;

interface RenderedPart {
  offsets: readonly number[];
  text: string;
}

/** Decodes one complete HTML entity through the owning MDX parser. */
function decodeEntity(entity: string): string {
  const cached = ENTITY_VALUES.get(entity);
  if (cached !== undefined) {
    return cached;
  }
  const paragraph = parseLessonMdx(entity).children?.[0];
  const text = paragraph?.children?.[0];
  assert.equal(text?.type, "text");
  const value = text?.value;
  assert.ok(typeof value === "string");
  ENTITY_VALUES.set(entity, value);
  return value;
}

/** Aligns parser-rendered text with authored escapes and HTML entities. */
function renderedOffsets(
  authored: string,
  rendered: string,
  sourceStart: number,
  continuationPrefixLength: number,
  inferContinuationPrefix: boolean
): number[] {
  const offsets: number[] = [];
  let decoded = "";
  let followsNewline = false;
  for (let sourceIndex = 0; sourceIndex < authored.length; ) {
    if (followsNewline && continuationPrefixLength > 0) {
      const prefix = inferContinuationPrefix
        ? (MARKDOWN_CONTINUATION_PREFIX_START_PATTERN.exec(
            authored.slice(sourceIndex)
          )?.[0] ?? "")
        : authored.slice(sourceIndex, sourceIndex + continuationPrefixLength);
      if (MARKDOWN_CONTINUATION_PREFIX_PATTERN.test(prefix)) {
        sourceIndex += prefix.length;
      }
    }
    followsNewline = false;
    ENTITY_PATTERN.lastIndex = sourceIndex;
    const entity = ENTITY_PATTERN.exec(authored);
    if (entity?.index === sourceIndex) {
      const entityValue = decodeEntity(entity[0]);
      decoded += entityValue;
      offsets.push(
        ...Array.from(
          { length: entityValue.length },
          () => sourceStart + sourceIndex
        )
      );
      sourceIndex += entity[0].length;
      continue;
    }
    const character = authored[sourceIndex];
    const escaped = authored[sourceIndex + 1];
    if (
      character === "\\" &&
      escaped !== undefined &&
      ESCAPABLE_CHARACTER_PATTERN.test(escaped)
    ) {
      decoded += escaped;
      offsets.push(sourceStart + sourceIndex + 1);
      sourceIndex += 2;
      continue;
    }
    const codePoint = authored.codePointAt(sourceIndex);
    assert.ok(codePoint !== undefined);
    const sourceCharacter = String.fromCodePoint(codePoint);
    decoded += sourceCharacter;
    offsets.push(
      ...Array.from(
        { length: sourceCharacter.length },
        (_, index) => sourceStart + sourceIndex + index
      )
    );
    sourceIndex += sourceCharacter.length;
    followsNewline = sourceCharacter === "\n";
  }
  assert.equal(decoded, rendered);
  return offsets;
}

/** Attaches parser-decoded text and exact authored offsets to one range. */
export function renderedSourceRange(
  range: SourceRange,
  rendered: string,
  source: string,
  trimQuotes = false,
  inferContinuationPrefix = false
): SourceRange {
  let start = range.start?.offset;
  let end = range.end?.offset;
  assert.ok(start !== undefined);
  assert.ok(end !== undefined);
  if (
    trimQuotes &&
    ((source[start] === '"' && source[end - 1] === '"') ||
      (source[start] === "'" && source[end - 1] === "'"))
  ) {
    start += 1;
    end -= 1;
  }
  const authored = source.slice(start, end);
  if (authored === rendered) {
    return {
      end: { offset: end },
      start: { offset: start },
    };
  }
  const offsets = renderedOffsets(
    authored,
    rendered,
    start,
    inferContinuationPrefix ? 1 : Math.max(0, (range.start?.column ?? 1) - 1),
    inferContinuationPrefix
  );
  return {
    end: { offset: end },
    rendered: {
      offsets,
      text: rendered,
    },
    start: { offset: start },
  };
}

/** Locates one direct string-valued MDX JSX attribute. */
export function directAttributeRange(
  attribute: MdxAttribute,
  source: string
): SourceRange | undefined {
  if (typeof attribute.value !== "string") {
    return;
  }
  const start = attribute.position?.start?.offset;
  const end = attribute.position?.end?.offset;
  assert.ok(start !== undefined);
  assert.ok(end !== undefined);
  const authored = source.slice(start, end);
  const equals = authored.indexOf("=");
  assert.notEqual(equals, -1);
  const valueOffset =
    authored.slice(equals + 1).search(NON_WHITESPACE_PATTERN) + equals + 1;
  const quote = authored[valueOffset];
  assert.ok(quote === '"' || quote === "'");
  const closing = authored.lastIndexOf(quote);
  assert.ok(valueOffset >= equals + 1);
  assert.ok(closing > valueOffset);
  return renderedSourceRange(
    {
      end: { offset: start + closing },
      start: { offset: start + valueOffset + 1 },
    },
    attribute.value,
    source
  );
}

/** Combines formatted Markdown text leaves into one visible source range. */
export function renderedNodeRange(
  node: MdxNode,
  source: string
): SourceRange | undefined {
  const parts: RenderedPart[] = [];

  /** Collects rendered text leaves in authored order. */
  function visit(current: MdxNode): void {
    if (current.type === "text" && typeof current.value === "string") {
      assert.ok(current.position);
      const range = renderedSourceRange(
        current.position,
        current.value,
        source
      );
      const start = range.start?.offset;
      if (range.rendered) {
        parts.push(range.rendered);
      } else {
        assert.ok(start !== undefined);
        parts.push({
          offsets: Array.from(
            { length: current.value.length },
            (_, index) => start + index
          ),
          text: current.value,
        });
      }
      return;
    }
    for (const child of current.children ?? []) {
      visit(child);
    }
  }

  visit(node);
  const firstOffset = parts[0]?.offsets[0];
  const lastPart = parts.at(-1);
  const lastOffset = lastPart?.offsets.at(-1);
  if (firstOffset === undefined || lastOffset === undefined) {
    return;
  }
  return {
    end: { offset: lastOffset + 1 },
    rendered: {
      offsets: parts.flatMap(({ offsets }) => offsets),
      text: parts.map(({ text }) => text).join(""),
    },
    start: { offset: firstOffset },
  };
}
