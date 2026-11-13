import { issueAtOffset } from "#nakafa-content/math/finding";
import { textSpans } from "#nakafa-content/math/span";
import { unitLength } from "#nakafa-content/math/unit";
import type { MdxNode } from "#nakafa-content/mdx/parse";
import {
  type VisibleTextScan,
  visibleTextOffsets,
} from "#nakafa-content/mdx/visible";
import type { LessonVoiceIssue } from "#nakafa-content/voice/types";

/** One plain number a learner reads as a quantity, with its sign and unit. */
export interface NumberMatch {
  /** The end of the number, its percent sign, or its unit. */
  readonly end: number;
  /** The start of the number, its minus sign, or its currency. */
  readonly start: number;
}

/** A digit run with its inner separators: `12`, `5.000`, `2,5`, `1/2`. */
const NUMBER_PATTERN = /\d+(?:[.,:/]\d+)*/gu;
const LETTER_PATTERN = /[\p{L}\p{M}_]/u;
const WORD_BEFORE_HYPHEN_PATTERN = /(?:^|[^\p{L}])(?<word>\p{L}+)-$/u;
const ORDINAL_PREFIXES = new Set(["ke", "Ke"]);
const SIGN_BEFORE_PATTERN = /(?:^|[\s([{=])[-−]$/u;
const CURRENCY_BEFORE_PATTERN = /(?:Rp\.?\s?|US\$|\$|€\s?|£)$/u;
const PERCENT_AFTER_PATTERN = /^\s?%/u;
const GLUED_AFTER_PATTERN = /^[-/]\p{L}/u;
const PATH_BEFORE_PATTERN = /[\p{L}\p{N}][/#@\\.]$|[#@\\^&]$/u;

/**
 * A bare year, a school year such as `2025/26`, or a law number such as
 * `12/2011`. Quantities of a thousand or more carry a thousands separator in
 * the corpus (`2.000`, `2,000`), so a bare four-digit number in this range
 * with no unit or percent sign is a year.
 */
const YEAR_PATTERN =
  /^(?:(?:1[5-9]|2[01])\d\d(?:\/\d{2,4})?|\d{1,4}\/(?:1[5-9]|2[01])\d\d)$/u;

/** Whether a character exists and is a letter, a mark, or an underscore. */
function isLetter(character: string | undefined): boolean {
  return character !== undefined && LETTER_PATTERN.test(character);
}

/**
 * Whether the text before a number glues it into a name: a letter such as
 * `B12`, a hyphenated name such as `COVID-19` (the Indonesian and Malay
 * ordinal `ke-3` stays a number), or a path, handle, or entity.
 */
function isGluedBefore(before: string): boolean {
  const previous = before.at(-1);
  if (isLetter(previous) || PATH_BEFORE_PATTERN.test(before)) {
    return true;
  }
  if (previous !== "-") {
    return false;
  }
  const word = WORD_BEFORE_HYPHEN_PATTERN.exec(before)?.groups?.word;
  return word !== undefined && !ORDINAL_PREFIXES.has(word);
}

/**
 * Returns the end of the unit or percent sign that follows a number, the end
 * of the number when none does, or `undefined` when a letter glues the number
 * into a name such as `3D`, `1990s`, or `2nd`.
 */
function quantityEnd(text: string, end: number): number | undefined {
  const after = text.slice(end);
  const percent = PERCENT_AFTER_PATTERN.exec(after);
  if (percent) {
    return end + percent[0].length;
  }
  const unit = unitLength(after);
  if (unit > 0) {
    return end + unit;
  }
  if (isLetter(after[0]) || GLUED_AFTER_PATTERN.test(after)) {
    return;
  }
  return end;
}

/** Returns the start of a number together with its minus sign or currency. */
function quantityStart(text: string, start: number): number {
  const before = text.slice(Math.max(0, start - 4), start);
  const currency = CURRENCY_BEFORE_PATTERN.exec(before);
  if (currency) {
    return start - currency[0].length;
  }
  return SIGN_BEFORE_PATTERN.test(before) ? start - 1 : start;
}

const RANGE_DASH_PATTERN = /^[-–]$/u;
const OPERATOR_BEFORE_PATTERN = /[=<>+×*÷/^]\s*$/u;
const OPERATOR_AFTER_PATTERN = /^\s*[=<>+×*÷/^]/u;

/**
 * Joins two quantities that a dash with no spaces joins into one range, such
 * as `2-3 kali` or `10–20%`, unless an operator sits next to them, because
 * `8-3=5` is a subtraction.
 */
function joinRanges(text: string, matches: NumberMatch[]): NumberMatch[] {
  const joined: NumberMatch[] = [];
  for (const match of matches) {
    const previous = joined.at(-1);
    const isRange =
      previous !== undefined &&
      RANGE_DASH_PATTERN.test(text.slice(previous.end, match.start)) &&
      !OPERATOR_BEFORE_PATTERN.test(text.slice(0, previous.start)) &&
      !OPERATOR_AFTER_PATTERN.test(text.slice(match.end));
    if (isRange) {
      joined[joined.length - 1] = { end: match.end, start: previous.start };
    } else {
      joined.push(match);
    }
  }
  return joined;
}

/**
 * Returns every plain number in one text that a learner reads as a quantity:
 * a count, a measurement, an amount, a percentage, or a value. Years, dates,
 * document labels, list and citation markers, and numbers glued into a name
 * stay text (see `textSpans`).
 */
export function findNumbers(text: string): NumberMatch[] {
  const spans = textSpans(text);
  const matches: NumberMatch[] = [];
  for (const match of text.matchAll(NUMBER_PATTERN)) {
    const start = match.index;
    const numberEnd = start + match[0].length;
    if (spans.some((span) => start >= span.start && start < span.end)) {
      continue;
    }
    const before = text.slice(Math.max(0, start - 24), start);
    if (isGluedBefore(before) && !CURRENCY_BEFORE_PATTERN.test(before)) {
      continue;
    }
    const end = quantityEnd(text, numberEnd);
    if (end === undefined) {
      continue;
    }
    const quantity = quantityStart(text, start);
    const bare = end === numberEnd && quantity === start;
    if (!(bare && YEAR_PATTERN.test(match[0]))) {
      matches.push({ end, start: quantity });
    }
  }
  return joinRanges(text, matches);
}

/** The scan of learner text for a plain number used as a quantity. */
export const PLAIN_NUMBER_SCAN: VisibleTextScan = {
  attributes: new Set([
    "alt",
    "caption",
    "description",
    "facts",
    "helperCaption",
    "label",
    "labels",
    "legend",
    "subtitle",
    "title",
    "xLabel",
    "yLabel",
  ]),
  find: (text) => findNumbers(text).map((match) => match.start),
  protectedNames: new Set(["code", "kbd", "pre", "samp"]),
  protectedTypes: new Set([
    "code",
    "definition",
    "html",
    "image",
    "inlineCode",
    "inlineMath",
    "link",
    "linkReference",
    "math",
    "mdxjsEsm",
  ]),
};

/**
 * Finds every number that learner-visible MDX writes as plain text beside
 * prose, which must be `<InlineMath />` like every other quantity.
 */
export function findPlainNumbers(
  source: string,
  tree: MdxNode
): LessonVoiceIssue[] {
  return visibleTextOffsets(source, tree, PLAIN_NUMBER_SCAN).map((offset) =>
    issueAtOffset(source, offset, "plain-number")
  );
}
