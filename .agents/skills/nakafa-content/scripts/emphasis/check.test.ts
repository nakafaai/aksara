import { assert, it } from "@effect/vitest";

import {
  findEmphasisArtifactIssues,
  findPhraseEmphasisIssues,
} from "#nakafa-content/emphasis/check";
import { type MdxNode, parseLessonMdx } from "#nakafa-content/mdx/parse";

it("finds whole sentence emphasis with either rendered marker", () => {
  for (const source of [
    "<Highlight>Vektor biasanya ditampilkan sebagai anak panah.</Highlight>",
    "**A vector is commonly drawn as an arrow.**",
    "<Highlight>Ein Vektor wird gewöhnlich als Pfeil gezeichnet.</Highlight>",
    "**The *same* magnitude and direction.**",
  ]) {
    assert.deepEqual(
      findPhraseEmphasisIssues(source).map(({ rule }) => rule),
      ["sentence-punctuation-emphasis"]
    );
  }
});

it("preserves phrase emphasis, abbreviations, code, and exact quotations", () => {
  for (const source of [
    "A vector has **magnitude and direction**.",
    "**Dr.** Example",
    "<Highlight>For example, **etc.**</Highlight>",
    '**<InlineMath math="x = 2." />**',
    "**`A whole code sentence here.`**",
    "> **A quoted sentence stays exactly as supplied.**",
    '"**A quoted sentence stays exactly as supplied.**"',
    "<Highlight>„Ein Zitat bleibt im Original.“</Highlight>",
    "```md\n**A code example stays exactly as supplied.**\n```",
  ]) {
    assert.deepEqual(findPhraseEmphasisIssues(source), []);
  }
});

it.each(["Langkah", "Step", "Schritt"])(
  "keeps the number inside the marked %s label",
  (label) => {
    for (const source of [
      `**${label}** 12:`,
      `<Highlight>${label}</Highlight> 12:`,
    ]) {
      assert.deepEqual(
        findEmphasisArtifactIssues(source).map(({ rule }) => rule),
        ["incomplete-step-emphasis"]
      );
    }
    for (const source of [
      `**${label} 12**:`,
      `<Highlight>${label} 12</Highlight>:`,
      `**${label}** berikutnya.`,
      `**${label}**\n\n1. A separate list`,
      `\`**${label}** 12\``,
      `**${label}** 12th`,
      `<span>${label}</span> 12`,
    ]) {
      assert.deepEqual(findEmphasisArtifactIssues(source), []);
    }
  }
);

it("ignores incomplete parser positions when checking step boundaries", () => {
  const tree: MdxNode = {
    children: [
      { children: [{ type: "text", value: "Step" }], type: "strong" },
      {
        children: [{ type: "text", value: "Step" }],
        position: { end: { offset: 8 } },
        type: "strong",
      },
      { children: [{ type: "inlineCode", value: 12 }], type: "strong" },
    ],
    type: "root",
  };
  assert.deepEqual(findEmphasisArtifactIssues("**Step** 1:", tree), [
    { column: 1, excerpt: "1:", line: 1, rule: "incomplete-step-emphasis" },
  ]);
});

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
