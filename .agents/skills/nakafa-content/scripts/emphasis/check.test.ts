import { assert, it } from "@effect/vitest";

import { findEmphasisArtifactIssues } from "#nakafa-content/emphasis/check";
import { type MdxNode, parseLessonMdx } from "#nakafa-content/mdx/parse";

it("rejects an emphasis marker whose partner is missing or in another paragraph", () => {
  assert.deepEqual(
    findEmphasisArtifactIssues(
      "The **sample space is <Highlight>the set of every outcome</Highlight>."
    ).map(({ line, rule }) => ({ line, rule })),
    [{ line: 1, rule: "unbalanced-emphasis" }]
  );
  assert.deepEqual(
    findEmphasisArtifactIssues(
      "A **span opens here.\n\nIt closes much later**. The learner reads raw markers."
    ).map(({ line, rule }) => ({ line, rule })),
    [
      { line: 1, rule: "unbalanced-emphasis" },
      { line: 3, rule: "unbalanced-emphasis" },
    ]
  );
});

it("keeps balanced emphasis and literal code markers valid", () => {
  const source = [
    "A balanced **emphasized** term and <Highlight>a phrase</Highlight> stay valid.",
    "",
    "A pair may still wrap **an inline <Highlight>component</Highlight> inside one paragraph**.",
    "",
    "```python",
    "value = 2 ** 3",
    "```",
    "",
    "Use the `**` operator for exponentiation.",
  ].join("\n");

  assert.deepEqual(findEmphasisArtifactIssues(source), []);
  assert.deepEqual(
    findEmphasisArtifactIssues(source, parseLessonMdx(source)),
    []
  );
});

it("reports the source line of the artifact and limits the excerpt", () => {
  const source = [
    "export const metadata = {};",
    "",
    "## Working with Matrices",
    "",
    `**${"long ".repeat(60)}term`,
  ].join("\n");

  assert.deepEqual(
    findEmphasisArtifactIssues(source).map(({ column, line, rule }) => ({
      column,
      line,
      rule,
    })),
    [{ column: 1, line: 5, rule: "unbalanced-emphasis" }]
  );
  assert.equal(findEmphasisArtifactIssues(source)[0]?.excerpt.length, 200);
});

it("tolerates text nodes without a resolved position or string value", () => {
  const tree: MdxNode = {
    children: [
      { type: "text", value: "**no position**" },
      { position: {}, type: "text", value: "**empty position**" },
      { type: "text", value: 5 },
      { type: "text", value: "plain prose" },
    ],
    type: "root",
  };

  assert.deepEqual(
    findEmphasisArtifactIssues("", tree).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [
      { line: 1, rule: "unbalanced-emphasis" },
      { line: 1, rule: "unbalanced-emphasis" },
    ]
  );
});
