import { assert, it } from "@effect/vitest";

import { findSectionBodyIssues } from "#nakafa-content/body/section";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";

const LONG_BODY =
  "This paragraph carries enough ordinary prose words to clear the thin section limit for the nested heading above it and it also states the shared purpose of the parts that follow.";

const lesson = (body: string): string =>
  `export const metadata = {};\n\n${body}`;

const rulesOf = (source: string): string[] =>
  findSectionBodyIssues(lesson(source)).map(({ rule }) => rule);

it("flags a heading with no body at all", () => {
  assert.deepEqual(rulesOf("## Alpha\n"), ["empty-section-body"]);
});

it("flags a heading whose next sibling starts before any content", () => {
  assert.deepEqual(rulesOf(`## Alpha\n\n## Beta\n\n${LONG_BODY}\n`), [
    "empty-section-body",
  ]);
});

it("flags a parent heading whose body holds only a heading", () => {
  assert.deepEqual(rulesOf(`## Alpha\n\n### Beta\n\n${LONG_BODY}\n`), [
    "heading-without-body",
  ]);
});

it("flags a section whose whole body is a list", () => {
  assert.deepEqual(rulesOf("## Alpha\n\n- first item\n- second item\n"), [
    "list-only-section",
  ]);
});

it("accepts a list whose items carry the teaching", () => {
  assert.deepEqual(
    rulesOf(
      "## Alpha\n\n- The first step stores every reflector below the diagonal so the later steps reuse it without rebuilding the matrix.\n- The second step keeps only the first columns of the factorized matrix and discards the rest.\n"
    ),
    []
  );
});

it("flags a section whose whole body is one component", () => {
  assert.deepEqual(rulesOf("## Alpha\n\n<CodeBlock\n  data={[]}\n/>\n"), [
    "component-only-section",
  ]);
});

it("flags a short body that carries no representation", () => {
  assert.deepEqual(
    rulesOf("## Alpha\n\nOnly nine short words sit here now.\n"),
    ["thin-section-body"]
  );
});

it("accepts a short lead once a table carries the comparison", () => {
  assert.deepEqual(
    rulesOf("## Alpha\n\nShort lead.\n\n| A | B |\n| --- | --- |\n| 1 | 2 |\n"),
    []
  );
});

it("accepts a short lead once a component carries the example", () => {
  assert.deepEqual(
    rulesOf("## Alpha\n\nShort lead.\n\n<CodeBlock\n  data={[]}\n/>\n"),
    []
  );
});

it("accepts a blockquote as the section representation", () => {
  assert.deepEqual(
    rulesOf("## Alpha\n\n> A stated assumption the prose analyzes.\n"),
    []
  );
});

it("accepts a long body that needs no representation", () => {
  assert.deepEqual(
    rulesOf(`Intro paragraph.\n\n## Alpha\n\n${LONG_BODY}\n`),
    []
  );
});

it("does not count a component or a code block as prose words", () => {
  assert.deepEqual(rulesOf('## Alpha\n\n<InlineMath math="x" />\n'), [
    "component-only-section",
  ]);
  assert.deepEqual(rulesOf("## Alpha\n\n```python\nprint(1)\n```\n"), []);
});

it("counts only ordinary words in a paragraph that carries inline math", () => {
  assert.deepEqual(
    rulesOf(
      '## Alpha\n\n<InlineMath math="x" /> is the input value used in this section.\n'
    ),
    ["thin-section-body"]
  );
});

it("counts the phrase inside a highlight as ordinary prose", () => {
  assert.deepEqual(
    rulesOf(
      "## Alpha\n\nThis section explains the rule and shows two worked examples, and the next paragraph names the <Highlight>decisive condition that decides the result</Highlight> before the practice set begins.\n"
    ),
    []
  );
});

it("scopes the check to lesson documents and reads an explicit tree", () => {
  const tree = parseLessonMdx(lesson("## Alpha\n"));
  assert.deepEqual(
    findSectionBodyIssues("", tree).map(({ rule }) => rule),
    ["empty-section-body"]
  );
  assert.deepEqual(findSectionBodyIssues("## Alpha\n"), []);
  assert.deepEqual(findSectionBodyIssues("", { type: "root" }), []);
});
