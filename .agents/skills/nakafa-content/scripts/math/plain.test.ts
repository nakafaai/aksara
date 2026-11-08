import { assert, it } from "@effect/vitest";
import { Effect } from "effect";
import { findPlainMathText, printPlainMath } from "#nakafa-content/math/plain";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import { capture } from "#nakafa-content/points/test/console";

/** The line and column of every plain-text math finding in one MDX source. */
function findings(source: string) {
  return findPlainMathText(source, parseLessonMdx(source)).map(
    ({ column, line }) => `${line}:${column}`
  );
}

it("finds math and chemistry written as plain text in prose, headings, tables and visual props", () => {
  const source = [
    "## Reaksi 2H₂ + O₂",
    "",
    "Air terbentuk dari H2O, dan C6H12O6 terurai menjadi CO2.",
    "",
    "Jika x = 2, maka luasnya 3 × 4 cm².",
    "",
    "| Langkah | Hasil |",
    "| --- | --- |",
    "| uap → cair | 8,0 − 0,1 = 7,9 |",
    "",
    '<MathVisual title="Sudut θ ≤ π" description="Gas O2 bereaksi." />',
  ].join("\n");
  assert.deepEqual(findings(source), [
    "1:13",
    "1:18",
    "3:20",
    "3:29",
    "3:53",
    "5:6",
    "5:28",
    "5:34",
    "9:7",
    "9:20",
    "9:22",
    "11:26",
    "11:28",
    "11:30",
    "11:50",
  ]);
});

it("keeps math, code, links, metadata and ordinary words out", () => {
  const source = [
    'export const metadata = { title: "Reaksi 2H₂O" };',
    "",
    '<InlineMath math="x^2 \\leq \\pi" /> dan <BlockMath math="\\ce{2H2 + O2 -> 2H2O}" />',
    "",
    "Kode `x = 2` dan [CO2 di atmosfer](https://example.com/x=2) tetap.",
    "",
    "Nakafa, SARS-CoV-2, NaN, kode pangan CP077, Vitamin B12 dan DNA bukan rumus.",
    "",
    "```python\ny = 3 * x\n```",
  ].join("\n");
  assert.deepEqual(findings(source), []);
});

it.effect("prints the count and every occurrence in a text report only", () =>
  Effect.gen(function* () {
    const issues = [
      {
        column: 6,
        excerpt: "Jika x = 2.",
        file: "en.mdx",
        line: 1,
        locale: "en" as const,
        rule: "plain-math-text",
      },
    ];
    const { log } = yield* capture(
      Effect.gen(function* () {
        yield* printPlainMath("json", issues);
        yield* printPlainMath("text", undefined);
        yield* printPlainMath("text", issues);
      })
    );
    assert.deepEqual(log, [
      "1 plain-text math or chemistry expression(s); write each as <InlineMath /> in prose or $...$ in a visual's text prop, with \\ce{...} for chemistry:",
      "en.mdx:1:6 [plain-math-text] Jika x = 2.",
    ]);
  })
);
