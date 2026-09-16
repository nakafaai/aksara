import { assert, it } from "@effect/vitest";

import { findUndefinedHeadingAbbreviationIssues } from "#nakafa-content/heading/abbreviation";
import { type MdxNode, parseLessonMdx } from "#nakafa-content/mdx/parse";

/** Wraps a lesson body in the static metadata declaration. */
const lesson = (body: string): string =>
  `export const metadata = {};\n\n${body}`;

/** Collects the rule ids reported for an authored lesson body. */
const rulesOf = (source: string): string[] =>
  findUndefinedHeadingAbbreviationIssues(lesson(source)).map(
    ({ rule }) => rule
  );

it("flags a heading abbreviation the lesson has not introduced", () => {
  assert.deepEqual(
    rulesOf("## LU Decomposition\n\nThe method factors the matrix.\n"),
    ["heading-undefined-abbreviation"]
  );
});

it("counts an abbreviation introduced in the lesson title", () => {
  const source = [
    "export const metadata = {",
    '  title: "SVD Basics",',
    "};",
    "",
    "## SVD Algorithm",
    "",
    "The method applies to every rectangular matrix.",
  ].join("\n");

  assert.deepEqual(findUndefinedHeadingAbbreviationIssues(source), []);
});

it("accepts an abbreviation introduced above the heading", () => {
  assert.deepEqual(
    rulesOf(
      "The QR decomposition factors a matrix into an orthogonal and an upper triangular part.\n\n## QR Algorithm\n\nThe steps repeat until the values settle.\n"
    ),
    []
  );
});

it("accepts a heading that spells the term out", () => {
  assert.deepEqual(
    rulesOf(
      "## Equivalent Computation with Singular Value Decomposition\n\nThe right singular vectors give the directions.\n"
    ),
    []
  );
});

it("flags a plural heading abbreviation the lesson has not introduced", () => {
  assert.deepEqual(
    rulesOf(
      "## NDCs State the Plan of Each Country\n\nEach country names its own target.\n"
    ),
    ["heading-undefined-abbreviation"]
  );
});

it("reads the abbreviation from the raw heading line", () => {
  assert.deepEqual(
    rulesOf("## LU **Decomposition**\n\nThe method factors the matrix.\n"),
    ["heading-undefined-abbreviation"]
  );
});

it("ignores a document that declares no lesson metadata", () => {
  assert.deepEqual(
    findUndefinedHeadingAbbreviationIssues(
      "## QR Decomposition\n\nBody text.\n"
    ),
    []
  );
});

it("ignores every non-heading child of a lesson", () => {
  const source = lesson(
    "An intro paragraph.\n\n## QR Decomposition\n\nThe method applies.\n"
  );

  assert.deepEqual(
    findUndefinedHeadingAbbreviationIssues(source, parseLessonMdx(source)).map(
      ({ rule }) => rule
    ),
    ["heading-undefined-abbreviation"]
  );
});

it("tolerates a tree without children", () => {
  assert.deepEqual(
    findUndefinedHeadingAbbreviationIssues("", { type: "root" }),
    []
  );
});

it("tolerates a heading line outside the source", () => {
  const tree: MdxNode = {
    children: [
      { type: "mdxjsEsm", value: "export const metadata = {};" },
      {
        position: { start: { line: 99, offset: 0 } },
        type: "heading",
      },
    ],
    type: "root",
  };

  assert.deepEqual(
    findUndefinedHeadingAbbreviationIssues("## QR Decomposition\n", tree),
    []
  );
});
