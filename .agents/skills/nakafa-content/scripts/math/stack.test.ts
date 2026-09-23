import { assert, it } from "@effect/vitest";
import { findMathStackIssues } from "#nakafa-content/math/stack";

const FIRST = '<BlockMath math="x+2=5" />';
const SECOND = '<BlockMath math="x=3" />';

it("reports touching cards despite blank source lines and comments", () => {
  const source = `${FIRST}\n\n{/* Solve the equation. */}\n\n${SECOND}`;
  assert.deepEqual(findMathStackIssues(source), [
    {
      column: 1,
      excerpt: SECOND,
      line: 5,
      rule: "unwrapped-math-stack",
    },
  ]);
});

it("keeps standalone formulas, real prose, visuals and separate list items", () => {
  for (const source of [
    FIRST,
    "<MathContainer />",
    `${FIRST}\n\nSubtract two from both sides.\n\n${SECOND}`,
    `${FIRST}\n\n<MathVisual />\n\n${SECOND}`,
    `- ${FIRST}\n- ${SECOND}`,
    `\`${FIRST} ${SECOND}\``,
    `\`\`\`mdx\n${FIRST}\n${SECOND}\n\`\`\``,
    `${FIRST}\n\n{explanation}\n\n${SECOND}`,
  ]) {
    assert.deepEqual(findMathStackIssues(source), [], source);
  }
});

it("accepts direct stack children including comment-only separators", () => {
  for (const source of [
    `<MathContainer>\n${FIRST}\n${SECOND}\n</MathContainer>`,
    `<MathContainer>\n${FIRST}\n{/* A separate complete step. */}\n${SECOND}\n</MathContainer>`,
  ]) {
    assert.deepEqual(findMathStackIssues(source), []);
  }
});

it("checks nested containers and fragments without crossing prose boundaries", () => {
  for (const source of [
    `<ContentStack>\n${FIRST}\n\n${SECOND}\n</ContentStack>`,
    `<>\n${FIRST}\n${SECOND}\n</>`,
    `${FIRST}\n\n<>\n${SECOND}\n</>`,
  ]) {
    assert.equal(
      findMathStackIssues(source).filter(
        ({ rule }) => rule === "unwrapped-math-stack"
      ).length,
      1,
      source
    );
  }
  assert.deepEqual(
    findMathStackIssues(`<div>${FIRST} explanation ${SECOND}</div>`),
    []
  );
  assert.equal(findMathStackIssues(`<div>${FIRST}  ${SECOND}</div>`).length, 1);
});

it("rejects wrapper children that break card grouping or visibility sizing", () => {
  for (const body of [
    `<>\n${FIRST}\n${SECOND}\n</>`,
    `<div>\n${FIRST}\n${SECOND}\n</div>`,
  ]) {
    const source = `<MathContainer>\n${body}\n</MathContainer>`;
    assert.deepEqual(
      findMathStackIssues(source).map(({ rule }) => rule),
      ["math-stack-content"]
    );
  }
});

it("rejects prose or a visual inside the formula-only container", () => {
  for (const content of [
    "The recurrence applies for positive indices.",
    "<MathVisual />",
    "## Conditions",
  ]) {
    const source = `<MathContainer>\n${FIRST}\n${SECOND}\n\n${content}\n</MathContainer>`;
    assert.deepEqual(
      findMathStackIssues(source).map(({ line, rule }) => ({ line, rule })),
      [{ line: 5, rule: "math-stack-content" }]
    );
  }
  assert.deepEqual(
    findMathStackIssues(
      `<ContentStack>\n<MathContainer>\n${FIRST}\n${SECOND}\n</MathContainer>\n<MathVisual />\n</ContentStack>`
    ),
    []
  );
});
