import { assert, it } from "@effect/vitest";
import { findPageFindings } from "#nakafa-content/heading/page";
import { corpusPage } from "#nakafa-content/heading/test";

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

it("holds an article to the title, scaffold, and width rules only", () => {
  const article = corpusPage(
    "b/id.mdx",
    "Politik Dinasti",
    ["## Ringkasan", "## Politik Dinasti di Asia"],
    { kind: "article" }
  );

  assert.deepStrictEqual(rules(article), ["generic-heading block 1"]);
});
