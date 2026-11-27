import { assert, it } from "@effect/vitest";
import { findPlainMathText } from "#nakafa-content/math/plain";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";

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

it("catches plain-text ions, ASCII unit exponents, caret powers, and nested labels object props", () => {
  const source = [
    "<SaltBridgeIonFlowLab",
    "  labels={{",
    '    view: "Galvanic cell with Cu2+ and mol/dm3 stays aria-only",',
    '    "math": "x^2 stays ignored",',
    '    0: "O2- and Na+ and NH4+ and NO3- ions",',
    '    netRelease: "Net CO2 release in mol/dm3",',
    '    redox: "Zn + Cu2+ -> Zn2+ + Cu",',
    '    count: "6.02 x 10^23 particles and 2^n gametes",',
    '    speed: "9.8 m/s2 with Cl- and OH- ions",',
    "  }}",
    "/>",
    "",
    "<DaltonEvidenceLab",
    '  labels={{ facts: [{ label: "Count", value: "2 = 2" }] }}',
    "/>",
  ].join("\n");
  assert.equal(findings(source).length, 14);
});

it("ignores non-chemical tokens such as A+, C++, mp3, P3K, and German suspended hyphens", () => {
  const source =
    "Nilai A+, bahasa C++, berkas mp3, kotak P3K, sowie VIP- und C3- und KI-Modelle.";
  assert.deepEqual(findings(source), []);
});
