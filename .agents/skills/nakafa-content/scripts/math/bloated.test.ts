import { assert, describe, it } from "@effect/vitest";
import {
  bloatedInlineMathReason,
  findBloatedInlineMathFindings,
} from "#nakafa-content/math/bloated";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";

describe("bloatedInlineMathReason", () => {
  it("preserves single variables, numbers, units, coordinates, simple fractions, and brief conditions", () => {
    for (const latex of [
      "",
      "x",
      "f'(x)",
      "\\Delta H",
      "\\mathrm{H_2O}",
      "2",
      "3{,}14",
      "25\\%",
      "5\\text{ cm}",
      "9{,}8\\text{ m/s}^2",
      "(3{,}13 \\pm 0{,}02)\\text{ cm}",
      "(2, -3)",
      "A(2, -3)",
      "x \\neq 0",
      "x \\ge 1",
      "x = -3",
      "y = 2x + 1",
      "0 < x < 1",
      "a \\le x \\le b",
      "\\frac{1}{2}",
      "\\frac{\\pi}{2}",
    ]) {
      assert.strictEqual(bloatedInlineMathReason(latex), undefined, latex);
    }
  });

  it("flags display environments, chained derivations, complex fractions, full equations, and long multi-term expressions", () => {
    for (const latex of [
      "\\begin{aligned}x &= 1 \\\\ y &= 2\\end{aligned}",
      "\\int_0^1 x^2\\,dx",
      "\\sum_{i=1}^n a_i",
      "2x + 4 = 10 \\implies x = 3",
      "x = \\frac{4}{2} = 2",
      "\\frac{2x + 1}{x - 3}",
      "\\frac{a}{b} + \\frac{c}{d}",
      "\\frac{\\frac{1}{2}}{3}",
      "\\frac{2^{n}}{3}",
      "\\frac{1234567}{2}",
      "2x^2 + 5x - 3 = 0",
      "V = \\frac{4}{3}\\pi r^3",
      "y = \\sqrt{x^2 + 1}",
      "f(x) = a_0 + a_1 x + a_2 x^2",
      "a + b + c + d",
      "2\\mathrm{H_2}(g) + \\mathrm{O_2}(g) \\rightarrow 2\\mathrm{H_2O}(g)",
      "\\alpha_1 \\beta_1 \\gamma_1 \\delta_1 \\epsilon_1 \\zeta_1 \\eta_1",
    ]) {
      assert.isDefined(bloatedInlineMathReason(latex), latex);
    }
  });
});

describe("findBloatedInlineMathFindings", () => {
  it("flags bloated InlineMath in paragraphs, lists, and blockquotes, including expression string props", () => {
    const source = [
      'Gunakan <InlineMath math="x \\neq 0" /> dan <InlineMath math="2x^2 + 5x - 3 = 0" />.',
      "",
      '- Langkah pertama memakai <InlineMath math={"\\\\frac{2x + 1}{x - 3}"} />.',
      "",
      '> Perhatikan <InlineMath math="x + 2 = 5 \\\\implies x = 3" />.',
    ].join("\n");

    const findings = findBloatedInlineMathFindings(parseLessonMdx(source));
    assert.deepStrictEqual(
      findings.map(({ blocking, line, rule }) => [line, blocking, rule]),
      [
        [1, true, "bloated-inline-math"],
        [3, true, "bloated-inline-math"],
        [5, true, "bloated-inline-math"],
      ]
    );
  });

  it("ignores table cells, code blocks, non-literal expressions, and visual props", () => {
    const source = [
      'export const metadata = { title: "Uji" };',
      "",
      "| Bentuk | Rumus |",
      "| --- | --- |",
      '| Kuadrat | <InlineMath math="2x^2 + 5x - 3 = 0" /> |',
      "",
      "```mdx",
      '<InlineMath math="2x^2 + 5x - 3 = 0" />',
      "```",
      "",
      '<MathVisual title={<>Kurva <InlineMath math="2x^2 + 5x - 3 = 0" /></>} description={<>Grafik</>} footer={<>Lihat</>} scene={{}} />',
      "",
      "Lihat <InlineMath />, <InlineMath math />, dan <InlineMath math={formula} />.",
    ].join("\n");

    assert.deepStrictEqual(
      findBloatedInlineMathFindings(parseLessonMdx(source)),
      []
    );
    assert.deepStrictEqual(
      findBloatedInlineMathFindings({
        children: [
          {
            children: [
              { name: "InlineMath", type: "mdxJsxTextElement" },
              {
                attributes: [{ name: "math", value: "a + b + c + d" }],
                name: "InlineMath",
                type: "mdxJsxTextElement",
              },
            ],
            type: "paragraph",
          },
        ],
        type: "root",
      }).map(({ line }) => line),
      [1]
    );
  });
});
