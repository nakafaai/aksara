import assert from "node:assert/strict";
import test from "node:test";

import { findLessonVoiceIssues } from "#nakafa-content/voice-scan";

test("checks named matrix methods in learner-visible component props", () => {
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

test("preserves QR codes quotations links code headings and metadata", () => {
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
    "> The source calls this the QR algorithm.",
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

test("rejects bare dot commands only inside rendered math", () => {
  const failing = [
    '<InlineMath math="x_1,ldots,x_n" />',
    '<InlineMath math={"x_1,cdots,x_n"} />',
    "<BlockMath math={`x_1,vdots,x_n`} />",
    '<InlineMath math={"x_1," + "ddots,x_n"} />',
  ].join("\n");
  const passing = [
    '<InlineMath math="x_1,\\ldots,x_n" />',
    '<MathVisual description="The word ldots is plain text." />',
    "{/* ldots in a code comment */}",
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
    ]
  );
  assert.deepEqual(findLessonVoiceIssues("en", passing), []);
  assert.deepEqual(
    findLessonVoiceIssues("en", "<InlineMath math={dynamicMath} />"),
    []
  );
});
