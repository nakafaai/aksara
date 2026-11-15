import { issueAtOffset } from "#nakafa-content/math/finding";
import type { MdxNode } from "#nakafa-content/mdx/parse";
import {
  type VisibleTextScan,
  visibleTextOffsets,
} from "#nakafa-content/mdx/visible";
import type { LessonVoiceIssue } from "#nakafa-content/voice/types";

/** One stretch of text that dollar signs mark as mathematics. */
export interface DollarSpan {
  readonly end: number;
  readonly start: number;
}

/** Display or inline math between double dollars on one line: `$$30$$`. */
const DOUBLE_PATTERN = /\$\$[^$\n]+?\$\$/gu;

/**
 * Inline math between single dollars on one line, read the way Pandoc reads
 * it: the opening dollar is followed by a non-space, the closing dollar
 * follows a non-space and is not followed by a digit. A price such as
 * `$5 and $10` or `$5-$6` stays text.
 */
const SINGLE_PATTERN =
  /(?<!\$)\$(?=[^\s$])[^$\n]*?[^\s$\\]\$(?![\d$])|(?<!\$)\$[^\s$\\]\$(?![\d$])/gu;

/**
 * Returns every stretch of one text that MDX would show with its dollar signs
 * because Aksara renders no dollar math: a document writes math with
 * `<InlineMath />` or `<BlockMath />`, and only response labels take `$$...$$`.
 */
export function findDollarSpans(text: string): DollarSpan[] {
  const doubles = [...text.matchAll(DOUBLE_PATTERN)].map((match) => ({
    end: match.index + match[0].length,
    start: match.index,
  }));
  /** Whether an offset lies inside a double-dollar span. */
  const isInsideDouble = (offset: number) =>
    doubles.some((span) => offset >= span.start && offset < span.end);
  const singles = [...text.matchAll(SINGLE_PATTERN)]
    .filter((match) => !isInsideDouble(match.index))
    .map((match) => ({
      end: match.index + match[0].length,
      start: match.index,
    }));
  return [...doubles, ...singles].sort(
    (left, right) => left.start - right.start
  );
}

/** The text a learner reads: prose, table cells, and visual text props. */
const DOLLAR_MATH_SCAN: VisibleTextScan = {
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
  find: (text) => findDollarSpans(text).map((span) => span.start),
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
 * Finds math that learner-visible MDX writes between dollar signs, which the
 * renderer shows as raw dollars and LaTeX instead of rendered math.
 */
export function findDollarMathIssues(
  source: string,
  tree: MdxNode
): LessonVoiceIssue[] {
  return visibleTextOffsets(source, tree, DOLLAR_MATH_SCAN).map((offset) =>
    issueAtOffset(source, offset, "dollar-math")
  );
}
