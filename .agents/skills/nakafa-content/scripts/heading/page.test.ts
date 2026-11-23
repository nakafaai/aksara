import { assert, it } from "@effect/vitest";
import { outlineHeadings } from "#nakafa-content/heading/outline";
import { findPageFindings } from "#nakafa-content/heading/page";
import { corpusPage } from "#nakafa-content/heading/test";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";

/** The rule, tier, and line of every finding of one page. */
function rules(page: ReturnType<typeof corpusPage>): string[] {
  return findPageFindings(page.page).map(
    ({ blocking, line, rule }) =>
      `${rule} ${blocking ? "block" : "review"} ${line}`
  );
}

it("reads the outline budget, the title, the scaffold labels, and the width of a lesson", () => {
  const lesson = corpusPage("a/id.mdx", "Sudut Pusat", [
    "## Sudut Pusat",
    "## Busur Menentukan Besar Sudut Pusat",
    "## Latihan",
  ]);

  assert.deepStrictEqual(rules(lesson), [
    "section-count review 1",
    "heading-title block 1",
    "generic-heading block 9",
    "heading-width review 5",
    "heading-density review 1",
  ]);
});

it("runs clean description and cohesion rules on lessons and descriptions on articles", () => {
  const source = [
    'export const metadata = { title: "Respirasi", description: "Form 4 Biology Chapter 7: ATP." };',
    "",
    "## Glikolisis",
    "",
    'Tahap tersebut memecah glukosa memakai <InlineMath math="2x^2 + 5x - 3 = 0" />.',
  ].join("\n");
  const tree = parseLessonMdx(source);
  const lessonFindings = findPageFindings({
    headings: outlineHeadings(source, tree),
    kind: "lesson",
    locale: "id",
    title: "Respirasi",
    tree,
  }).map(({ rule }) => rule);

  assert.include(lessonFindings, "metadata-description-prefix");
  assert.include(lessonFindings, "metadata-description-punctuation");
  assert.include(lessonFindings, "stiff-formal-prose");
  assert.include(lessonFindings, "missing-blockquote");
  assert.include(lessonFindings, "bloated-inline-math");

  const articleFindings = findPageFindings({
    headings: outlineHeadings(source, tree),
    kind: "article",
    locale: "id",
    title: "Respirasi",
    tree,
  }).map(({ rule }) => rule);
  assert.include(articleFindings, "metadata-description-prefix");
  assert.include(articleFindings, "metadata-description-punctuation");
  assert.notInclude(articleFindings, "stiff-formal-prose");
  assert.notInclude(articleFindings, "missing-blockquote");
  assert.notInclude(articleFindings, "bloated-inline-math");
});

it("holds an article to the description, title, scaffold, and width rules only", () => {
  const article = corpusPage(
    "b/id.mdx",
    "Politik Dinasti",
    ["## Ringkasan", "## Politik Dinasti di Asia"],
    { kind: "article" }
  );

  assert.deepStrictEqual(rules(article), ["generic-heading block 1"]);
});
