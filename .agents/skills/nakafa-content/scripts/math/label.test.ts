import { assert, it } from "@effect/vitest";

import { findMalformedLatexCommandIssues } from "#nakafa-content/math/command";
import { findPlainMathLabelIssues } from "#nakafa-content/math/label";
import { findLessonVoiceIssues } from "#nakafa-content/voice/scan";

it("checks named matrix methods in learner-visible component props", () => {
  const source = [
    '<LineEquation title="QR algorithm" />',
    "<LineEquation",
    '  description={<>Compare SVD with <InlineMath math="\\mathrm{QR}" />.</>}',
    "/>",
  ].join("\n");

  assert.deepEqual(
    findLessonVoiceIssues("en", source).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [
      { line: 1, rule: "plain-math-label" },
      { line: 3, rule: "plain-math-label" },
    ]
  );
});

it("preserves QR codes links code headings and metadata", () => {
  const source = [
    "export const metadata = {",
    '  title: "QR Algorithm",',
    '  description: "Compare the matrix method.",',
    "};",
    "",
    "## QR Algorithm",
    "A QR code stores a URL.",
    "Der QR-Code speichert eine URL.",
    "Kode QR menyimpan sebuah URL.",
    "[QR Algorithm](https://example.com/qr)",
    "Use `QR` in this code example.",
    "```text",
    "QR LU SVD",
    "```",
    "<CodeBlock>QR LU SVD</CodeBlock>",
    "<LineEquation",
    "  data={() => {",
    "    // QR LU SVD are code-comment labels, not learner prose.",
    "    return [];",
    "  }}",
    "/>",
  ].join("\n");

  assert.deepEqual(findLessonVoiceIssues("en", source), []);
});

it("checks named matrix methods inside instructional blockquotes", () => {
  assert.deepEqual(
    findPlainMathLabelIssues("> Compare QR with SVD.").map(
      ({ column, line, rule }) => ({ column, line, rule })
    ),
    [
      { column: 11, line: 1, rule: "plain-math-label" },
      { column: 19, line: 1, rule: "plain-math-label" },
    ]
  );
});

it("rejects bare dot commands only inside rendered math", () => {
  const failing = [
    '<InlineMath math="x_1,ldots,x_n" />',
    '<InlineMath math={"x_1,cdots,x_n"} />',
    "<BlockMath math={`x_1,vdots,x_n`} />",
    '<InlineMath math={"x_1," + "ddots,x_n"} />',
    '<InlineMath math={"l" + "dots"} />',
    '<InlineMath math="x_1,\\\\ldots,x_n" />',
  ].join("\n");
  const passing = [
    '<InlineMath math="x_1,\\ldots,x_n" />',
    '<MathVisual description="The word ldots is plain text." />',
    '> <InlineMath math="x_1,ldots,x_n" />',
    "{/* ldots in a code comment */}",
    '<InlineMath math={"x_1,\\\\" + "ldots,x_n"} />',
  ].join("\n");

  assert.deepEqual(
    findLessonVoiceIssues("en", failing).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [
      { line: 1, rule: "malformed-latex-command" },
      { line: 2, rule: "malformed-latex-command" },
      { line: 3, rule: "malformed-latex-command" },
      { line: 4, rule: "malformed-latex-command" },
      { line: 5, rule: "malformed-latex-command" },
      { line: 6, rule: "malformed-latex-command" },
    ]
  );
  assert.deepEqual(findLessonVoiceIssues("en", passing), []);
  assert.deepEqual(
    findLessonVoiceIssues("en", "<InlineMath math={dynamicMath} />"),
    []
  );
});

it("supports direct scanner calls without a pre-parsed tree", () => {
  assert.deepEqual(
    findPlainMathLabelIssues("Compare QR with SVD.").map(
      ({ column, rule }) => ({
        column,
        rule,
      })
    ),
    [
      { column: 9, rule: "plain-math-label" },
      { column: 17, rule: "plain-math-label" },
    ]
  );
  assert.deepEqual(
    findMalformedLatexCommandIssues('<InlineMath math="x,ldots,y" />').map(
      ({ column, rule }) => ({ column, rule })
    ),
    [{ column: 21, rule: "malformed-latex-command" }]
  );
  assert.deepEqual(findPlainMathLabelIssues("<Chart title />"), []);
  assert.deepEqual(findMalformedLatexCommandIssues("<InlineMath math />"), []);
});

it("checks static copy in sparse expressions and ignores dynamic values", () => {
  const source = [
    '<Chart title={[, "QR", dynamicTitle]} />',
    "<Chart title={<span>SVD</span>} />",
    "<Chart title={<UI.Label>LU</UI.Label>} />",
  ].join("\n");

  assert.deepEqual(
    findPlainMathLabelIssues(source).map(({ column, line, rule }) => ({
      column,
      line,
      rule,
    })),
    [
      { column: 19, line: 1, rule: "plain-math-label" },
      { column: 21, line: 2, rule: "plain-math-label" },
      { column: 25, line: 3, rule: "plain-math-label" },
    ]
  );
});

it("maps decoded math labels back to their authored JSX entity", () => {
  const source = '<Chart title="&#81;R decomposition" />';

  assert.deepEqual(findPlainMathLabelIssues(source), [
    {
      column: source.indexOf("&#81;") + 1,
      excerpt: source,
      line: 1,
      rule: "plain-math-label",
    },
  ]);
});
