import { assert, it } from "@effect/vitest";

import { findOpeningHighlightIssues } from "#nakafa-content/highlight/opening";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";

/** Wraps a lesson body in the static metadata declaration. */
const authored = (body: string): string =>
  `export const metadata = {};\n\n${body}`;

it("flags an authored document whose opening marks no phrase", () => {
  const source = authored(
    [
      "## Menerapkan Aturan Turunan",
      "",
      "Kenali dahulu struktur fungsi sebelum memilih aturan turunan.",
      "",
      "## Contoh",
      "",
      "Bagian ini memakai <Highlight>aturan turunan</Highlight> yang sesuai.",
    ].join("\n")
  );

  assert.deepEqual(findOpeningHighlightIssues(source), [
    {
      column: 1,
      excerpt: "## Menerapkan Aturan Turunan",
      line: 3,
      rule: "lesson-opening-highlight",
    },
  ]);
});

it("accepts an opening that carries either marker", () => {
  const bold = authored(
    "## Section\n\nA **decisive condition** decides the next step."
  );
  const highlight = authored(
    "## Section\n\nThe <Highlight>decisive condition</Highlight> decides the next step."
  );
  const heading = authored(
    "## The <Highlight>decisive</Highlight> condition\n\nText follows."
  );

  assert.deepEqual(findOpeningHighlightIssues(bold), []);
  assert.deepEqual(findOpeningHighlightIssues(highlight), []);
  assert.deepEqual(findOpeningHighlightIssues(heading), []);
  assert.deepEqual(findOpeningHighlightIssues(bold, parseLessonMdx(bold)), []);
});

it("accepts an introduction paragraph that opens before any heading", () => {
  const source = authored(
    "The **sample space** lists every outcome.\n\n## Example\n\nText."
  );

  assert.deepEqual(findOpeningHighlightIssues(source), []);
});

it("ignores documents without authored metadata or without sections", () => {
  assert.deepEqual(findOpeningHighlightIssues("## Section\n\nText."), []);
  assert.deepEqual(findOpeningHighlightIssues("", { type: "root" }), []);
});

it("reports a missing opener position with the first line", () => {
  const tree = {
    children: [
      { type: "mdxjsEsm", value: "export const metadata = {};" },
      { children: [{ type: "text", value: "Text." }], type: "paragraph" },
    ],
    type: "root",
  };

  assert.deepEqual(findOpeningHighlightIssues("", tree), [
    { column: 1, excerpt: "", line: 1, rule: "lesson-opening-highlight" },
  ]);
});

it("reports an opener positioned beyond the source", () => {
  const tree = {
    children: [
      { type: "mdxjsEsm", value: "export const metadata = {};" },
      {
        children: [{ type: "text", value: "Text." }],
        position: { start: { column: 1, line: 9 } },
        type: "paragraph",
      },
    ],
    type: "root",
  };

  assert.deepEqual(findOpeningHighlightIssues("", tree), [
    { column: 1, excerpt: "", line: 9, rule: "lesson-opening-highlight" },
  ]);
});
