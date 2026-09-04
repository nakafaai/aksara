import { assert, it } from "@effect/vitest";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import { findMathBlockFragmentIssues } from "#nakafa-content/voice/fragment";

it("reviews a lowercase paragraph fragment after displayed math", () => {
  const source = [
    '<BlockMath math="x^2=4" />',
    "",
    "dengan syarat x adalah bilangan real.",
  ].join("\n");

  assert.deepEqual(
    findMathBlockFragmentIssues(source, parseLessonMdx(source)),
    [
      {
        column: 1,
        excerpt: "dengan syarat x adalah bilangan real.",
        line: 3,
        rule: "lowercase-fragment-after-math-block",
      },
    ]
  );
});

it("preserves a complete sentence and prose that starts with inline math", () => {
  const source = [
    '<BlockMath math="x^2=4" />',
    "",
    "Variabel x harus berupa bilangan real.",
    "",
    '<BlockMath math="y=2" />',
    "",
    '<InlineMath math="y" /> adalah hasil akhirnya.',
  ].join("\n");

  assert.deepEqual(
    findMathBlockFragmentIssues(source, parseLessonMdx(source)),
    []
  );
});

it("reviews the first paragraph after a math container", () => {
  const source = [
    "<MathContainer>",
    '  <BlockMath math="x=1" />',
    '  <BlockMath math="y=2" />',
    "</MathContainer>",
    "",
    "where x and y are real numbers.",
  ].join("\n");

  assert.deepEqual(
    findMathBlockFragmentIssues(source, parseLessonMdx(source)),
    [
      {
        column: 1,
        excerpt: "where x and y are real numbers.",
        line: 6,
        rule: "lowercase-fragment-after-math-block",
      },
    ]
  );
});

it("handles roots without children and unavailable source lines", () => {
  assert.deepEqual(findMathBlockFragmentIssues("", { type: "root" }), []);
  assert.deepEqual(
    findMathBlockFragmentIssues("one line", {
      children: [
        { name: "BlockMath", type: "mdxJsxFlowElement" },
        {
          children: [{ type: "text", value: "lowercase fragment" }],
          position: { start: { column: 1, line: 2 } },
          type: "paragraph",
        },
      ],
      type: "root",
    }),
    [
      {
        column: 1,
        excerpt: "",
        line: 2,
        rule: "lowercase-fragment-after-math-block",
      },
    ]
  );
});
