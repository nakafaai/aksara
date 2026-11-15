import { Predicate } from "effect";
import { issueAtOffset } from "#nakafa-content/math/finding";
import { sourceOffsetForStaticMatch } from "#nakafa-content/mdx/offset";
import {
  attributeEstree,
  type MdxAttribute,
  type MdxNode,
  visitMdxNodes,
} from "#nakafa-content/mdx/parse";
import { staticStringCandidates } from "#nakafa-content/mdx/static";
import type {
  LessonVoiceIssue,
  LessonVoiceLocale,
} from "#nakafa-content/voice/types";

/**
 * A clock time inside math with a braced separator, such as `20{:}24` or
 * `16{.}00`. A braced colon is how the corpus spells a time, a ratio keeps
 * its relation spacing, and two digits after a braced point are no thousands
 * group, so in every locale this is a time.
 */
const BRACED_CLOCK_PATTERN =
  /(?<![\d{}])(?:[01]?\d|2[0-4])\{[.:]\}[0-5]\d(?![\d{])/gu;

/**
 * A whole math value that is an hour and minutes joined by a bare point, such
 * as `20.24` or `07.00`. Indonesian and German write a decimal with a comma,
 * so in those locales this value can only be a time.
 */
const DOTTED_CLOCK_PATTERN = /^(?:[01]\d|2[0-4])\.[0-5]\d$/u;

/** The locales whose decimal mark is a comma. */
const COMMA_DECIMAL_LOCALES = new Set<LessonVoiceLocale>(["de", "id"]);

/** Returns the offset of every clock time inside one decoded math value. */
function clockOffsets(value: string, locale: LessonVoiceLocale): number[] {
  const offsets = [...value.matchAll(BRACED_CLOCK_PATTERN)].map(
    (match) => match.index
  );
  if (COMMA_DECIMAL_LOCALES.has(locale) && DOTTED_CLOCK_PATTERN.test(value)) {
    offsets.push(0);
  }
  return offsets;
}

/** Records the clock times of one `math` prop at their source offsets. */
function collectAttributeOffsets(
  attribute: MdxAttribute,
  locale: LessonVoiceLocale,
  offsets: Set<number>,
  source: string
): void {
  if (attribute.name !== "math") {
    return;
  }
  if (Predicate.isString(attribute.value)) {
    const start = Number(attribute.position?.start?.offset);
    const end = Number(attribute.position?.end?.offset);
    const valueStart =
      start + source.slice(start, end).indexOf(attribute.value);
    for (const offset of clockOffsets(attribute.value, locale)) {
      offsets.add(valueStart + offset);
    }
    return;
  }
  const expression = attributeEstree(attribute);
  if (!expression) {
    return;
  }
  for (const candidate of staticStringCandidates(expression)) {
    for (const offset of clockOffsets(candidate.text, locale)) {
      offsets.add(sourceOffsetForStaticMatch(candidate, offset, source));
    }
  }
}

/**
 * Finds a clock time written inside math. A time names a moment, so it stays
 * text (`pukul 20.24`, `8:24 p.m.`, `20:24 Uhr`), while a duration such as
 * `84` minutes stays a quantity.
 */
export function findClockMathIssues(
  locale: LessonVoiceLocale,
  source: string,
  tree: MdxNode
): LessonVoiceIssue[] {
  const offsets = new Set<number>();
  visitMdxNodes(tree, (node) => {
    if (
      node.type !== "mdxJsxFlowElement" &&
      node.type !== "mdxJsxTextElement"
    ) {
      return;
    }
    for (const attribute of node.attributes ?? []) {
      collectAttributeOffsets(attribute, locale, offsets, source);
    }
  });
  return [...offsets]
    .sort((left, right) => left - right)
    .map((offset) => issueAtOffset(source, offset, "clock-time-math"));
}
