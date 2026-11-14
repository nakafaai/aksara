import assert from "node:assert/strict";
import type { AppLocaleCode } from "@nakafa/aksara-contracts/locale";
import { findNumbers, PLAIN_NUMBER_SCAN } from "#nakafa-content/math/number";
import { quantityMath } from "#nakafa-content/math/quantity";
import type { MdxNode } from "#nakafa-content/mdx/parse";
import {
  type VisibleTextRange,
  visibleTextRanges,
} from "#nakafa-content/mdx/visible";

/** One replacement of a source range. */
interface Edit {
  readonly end: number;
  readonly start: number;
  readonly text: string;
}

/** The rewritten source and the numbers a person still has to write. */
export interface WrapResult {
  /**
   * Source offsets of the numbers left as text: ambiguous separators, a
   * string prop, an operand of a plain-text expression, or a number alone on
   * its line.
   */
  readonly left: readonly number[];
  readonly source: string;
  readonly wrapped: number;
}

const SPACE = '{" "}';
const LINE_BREAK_BEFORE_PATTERN = /\S[^\S\n]*\n\s*$/u;
const LINE_BREAK_AFTER_PATTERN = /^\s*\n\s*\S/u;
const OPERATOR_BEFORE_PATTERN =
  /(?:[+×*÷/=<>^±]|[\p{N})\]][^\S\n]*[-−])[^\S\n]*$/u;
const OPERATOR_AFTER_PATTERN =
  /^[^\S\n]*(?:[+×*÷/=<>^±]|[-−][^\S\n]*[\p{N}\p{L}(])/u;
const SIGN_PATTERN = /^[-−]/u;
const CALL_BEFORE_PATTERN = /[\p{L}\p{N}_]\($/u;
const OPERAND_BEFORE_PATTERN = /[\p{N})\]][^\S\n]*$/u;
const LINE_START_PATTERN = /^[\t >]*(?:[-*+]|\d+[.)])?[\t ]*$/u;
const LINE_END_PATTERN = /^[\t ]*(?:\n|$)/u;

/**
 * Whether a number fills its whole Markdown line, after any list marker, so
 * an element in its place would parse as its own block instead of prose.
 */
function fillsLine(source: string, start: number, end: number): boolean {
  const lineStart = source.lastIndexOf("\n", start - 1) + 1;
  return (
    LINE_START_PATTERN.test(source.slice(lineStart, start)) &&
    LINE_END_PATTERN.test(source.slice(end))
  );
}

/**
 * Whether an arithmetic operator touches a number, so the number is one
 * operand of a plain-text expression such as `3 + 2i` or `10 - 4`, or a
 * comma number fills a parenthesis, where `(5,5)` may be a point or a
 * decimal, or the number is an argument such as `f(1, 2)`. A person must
 * write each as one math expression.
 */
function isOperand(raw: string, before: string, after: string): boolean {
  return (
    (raw.includes(",") && before.endsWith("(") && after.startsWith(")")) ||
    CALL_BEFORE_PATTERN.test(raw.startsWith("(") ? `${before}(` : before) ||
    OPERATOR_BEFORE_PATTERN.test(before) ||
    OPERATOR_AFTER_PATTERN.test(after) ||
    (SIGN_PATTERN.test(raw) && OPERAND_BEFORE_PATTERN.test(before))
  );
}

/**
 * Writes one quantity as an `<InlineMath />` element. Inside JSX text a line
 * break next to an element disappears, so a line break that separates the
 * number from a word keeps its space as `{" "}`.
 */
function element(
  math: string,
  kind: VisibleTextRange["kind"],
  before: string,
  after: string
): string {
  const inline = `<InlineMath math="${math}" />`;
  if (kind !== "jsx") {
    return inline;
  }
  const spaceBefore = LINE_BREAK_BEFORE_PATTERN.test(before) ? SPACE : "";
  const spaceAfter = LINE_BREAK_AFTER_PATTERN.test(after) ? SPACE : "";
  return `${spaceBefore}${inline}${spaceAfter}`;
}

/** Collects the edits and the numbers left for one learner-visible range. */
function rangeEdits(
  source: string,
  locale: AppLocaleCode,
  { kind, range }: VisibleTextRange
): { edits: Edit[]; left: number[] } {
  const start = range.start?.offset;
  const end = range.end?.offset;
  assert.ok(start !== undefined);
  assert.ok(end !== undefined);
  const text = range.rendered?.text ?? source.slice(start, end);
  const edits: Edit[] = [];
  const left: number[] = [];
  for (const match of findNumbers(text)) {
    const raw = text.slice(match.start, match.end);
    const before = text.slice(0, match.start);
    const after = text.slice(match.end);
    const math =
      kind === "string" ||
      isOperand(raw, before, after) ||
      (kind === "markdown" &&
        fillsLine(source, start + match.start, start + match.end))
        ? undefined
        : quantityMath(raw, locale, before);
    if (math === undefined) {
      left.push(range.rendered?.offsets[match.start] ?? start + match.start);
      continue;
    }
    edits.push({
      end: start + match.end,
      start: start + match.start,
      text: element(math, kind, before, after),
    });
  }
  return { edits, left };
}

/**
 * Wraps every plain quantity in prose and JSX text with `<InlineMath />` in
 * the corpus convention of the locale. Numbers whose separators are
 * ambiguous, and numbers inside string props, stay text and are returned in
 * `left`, because only a person can decide them.
 */
export function wrapNumbers(
  source: string,
  tree: MdxNode,
  locale: AppLocaleCode
): WrapResult {
  const edits = new Map<number, Edit>();
  const left = new Set<number>();
  for (const range of visibleTextRanges(source, tree, PLAIN_NUMBER_SCAN)) {
    const found = rangeEdits(source, locale, range);
    for (const edit of found.edits) {
      edits.set(edit.start, edit);
    }
    for (const offset of found.left) {
      left.add(offset);
    }
  }
  let output = source;
  for (const edit of [...edits.values()].sort((a, b) => b.start - a.start)) {
    output = `${output.slice(0, edit.start)}${edit.text}${output.slice(edit.end)}`;
  }
  return {
    left: [...left].sort((a, b) => a - b),
    source: output,
    wrapped: edits.size,
  };
}
