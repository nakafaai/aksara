import { assert, it } from "@effect/vitest";

import { findHighlightNestingIssues } from "#nakafa-content/highlight/nesting";

/** Wraps a lesson body in the static metadata declaration. */
const authored = (body: string): string =>
  `export const metadata = {};\n\n${body}`;

it("flags a highlight nested inside another highlight", () => {
  const source = authored(
    "## Section\n\nThe <Highlight>outer <Highlight>inner</Highlight> phrase</Highlight> decides."
  );

  assert.deepEqual(
    findHighlightNestingIssues(source).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [{ line: 5, rule: "highlight-nesting" }]
  );
});

it("flags markers nested across both syntaxes", () => {
  const strongInHighlight = authored(
    "## Section\n\nThe <Highlight>decisive **condition**</Highlight> decides."
  );
  const highlightInStrong = authored(
    "## Section\n\nThe **decisive <Highlight>condition</Highlight>** decides."
  );

  assert.equal(findHighlightNestingIssues(strongInHighlight).length, 1);
  assert.equal(findHighlightNestingIssues(highlightInStrong).length, 1);
});

it("accepts sibling markers that share one section", () => {
  const source = authored(
    [
      "## Section",
      "",
      "The <Highlight>decisive condition</Highlight> decides.",
      "",
      "A **key term** follows.",
    ].join("\n")
  );

  assert.deepEqual(findHighlightNestingIssues(source), []);
});

it("ignores a document that declares no lesson metadata", () => {
  assert.deepEqual(
    findHighlightNestingIssues("## Section\n\nThe **condition** decides."),
    []
  );
});

it("ignores a document without parsed children", () => {
  assert.deepEqual(findHighlightNestingIssues("", { type: "root" }), []);
});

it("reports a nested marker positioned without source ranges", () => {
  const tree = {
    children: [
      { type: "mdxjsEsm", value: "export const metadata = {};" },
      {
        children: [
          {
            children: [{ name: "Highlight", type: "mdxJsxTextElement" }],
            name: "Highlight",
            type: "mdxJsxFlowElement",
          },
        ],
        type: "paragraph",
      },
    ],
    type: "root",
  };

  assert.deepEqual(findHighlightNestingIssues("", tree), [
    { column: 1, excerpt: "", line: 1, rule: "highlight-nesting" },
  ]);
});

it("reports a nested marker positioned beyond the source", () => {
  const tree = {
    children: [
      { type: "mdxjsEsm", value: "export const metadata = {};" },
      {
        children: [
          {
            children: [
              {
                name: "Highlight",
                position: { start: { column: 2, line: 9 } },
                type: "mdxJsxTextElement",
              },
            ],
            name: "Highlight",
            type: "mdxJsxFlowElement",
          },
        ],
        type: "paragraph",
      },
    ],
    type: "root",
  };

  assert.deepEqual(findHighlightNestingIssues("", tree), [
    { column: 2, excerpt: "", line: 9, rule: "highlight-nesting" },
  ]);
});
