import { assert, it } from "@effect/vitest";
import {
  findDollarMathIssues,
  findDollarSpans,
} from "#nakafa-content/math/dollar";
import { findPlainNumbers } from "#nakafa-content/math/number";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";

/** The exact text of every dollar-math stretch in one text. */
function spans(text: string): string[] {
  return findDollarSpans(text).map(({ end, start }) => text.slice(start, end));
}

/** The rule, line, and column of every finding in one MDX source. */
function findings(source: string): string[] {
  const tree = parseLessonMdx(source);
  return [
    ...findDollarMathIssues(source, tree),
    ...findPlainNumbers(source, tree),
  ].map(({ column, line, rule }) => `${rule} ${line}:${column}`);
}

it("finds double and single dollar math", () => {
  assert.deepEqual(spans("Hasilnya $$30$$ dan $x^2$ serta $$\\frac{1}{2}$$."), [
    "$$30$$",
    "$x^2$",
    "$$\\frac{1}{2}$$",
  ]);
  assert.deepEqual(spans("Ambil $n$ siswa."), ["$n$"]);
});

it("keeps prices as text", () => {
  assert.deepEqual(
    spans("USD $100, $5 and $10, $5-$6, US$4 or $1,250.50 each."),
    []
  );
});

it("reports dollar math once, not as a plain number with a currency", () => {
  assert.deepEqual(findings("Jumlahnya $$30$$ buah."), ["dollar-math 1:11"]);
  assert.deepEqual(findings("Ada $x+2$ kursi."), ["dollar-math 1:5"]);
});

it("keeps dollars in code, components, and real prices out", () => {
  const source = [
    'Nilai <InlineMath math="30" /> dan `$$30$$` di kode.',
    "",
    "Harganya USD $100.",
  ].join("\n");
  assert.deepEqual(findings(source), ["plain-number 3:14"]);
});
