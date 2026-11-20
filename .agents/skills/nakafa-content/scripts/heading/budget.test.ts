import { assert, describe, it } from "@effect/vitest";
import { findBudgetFindings } from "#nakafa-content/heading/budget";
import type { OutlineHeading } from "#nakafa-content/heading/outline";

/** Builds one outline from depths, numbering each heading by its line. */
function outline(...depths: readonly number[]): OutlineHeading[] {
  return depths.map((depth, index) => ({
    depth,
    excerpt: "",
    label: `Topic ${index}`,
    line: index + 1,
    words: `Topic ${index}`,
  }));
}

/** The rule, tier, and line of every finding. */
function budget(headings: readonly OutlineHeading[]): string[] {
  return findBudgetFindings("en", headings).map(
    ({ blocking, line, rule }) =>
      `${rule} ${blocking ? "block" : "review"} ${line}`
  );
}

describe("findBudgetFindings", () => {
  it("accepts six sections with grouped subsections", () => {
    assert.deepStrictEqual(budget(outline(2, 2, 3, 3, 2, 2, 2, 2)), []);
  });

  it("asks for a review above ten entries and blocks above twelve", () => {
    assert.deepStrictEqual(budget(outline(2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 2)), [
      "outline-budget review 1",
    ]);
    assert.deepStrictEqual(
      budget(outline(2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2)),
      ["outline-budget block 1"]
    );
  });

  it("blocks a ninth H2 and asks for a review below four", () => {
    assert.deepStrictEqual(budget(outline(2, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2)), [
      "outline-budget review 1",
      "section-count block 11",
    ]);
    assert.deepStrictEqual(budget(outline(2, 2, 2)), [
      "section-count review 1",
    ]);
    assert.deepStrictEqual(budget([]), []);
  });

  it("asks for a review at four subsections and blocks a fifth", () => {
    assert.deepStrictEqual(budget(outline(2, 2, 3, 3, 3, 3, 2, 2)), [
      "section-fanout review 2",
    ]);
    assert.deepStrictEqual(budget(outline(2, 3, 3, 3, 3, 3, 2, 2, 2)), [
      "section-fanout block 1",
    ]);
  });

  it("blocks seven flat sections, where solution subsections do not group", () => {
    const flat = outline(2, 2, 2, 2, 2, 2, 2, 3);
    const solutions = flat.map((heading) =>
      heading.depth === 3 ? { ...heading, words: "Worked Solutions" } : heading
    );

    assert.deepStrictEqual(budget(solutions), ["flat-sections block 1"]);
    assert.deepStrictEqual(budget(outline(2, 2, 2, 2, 2, 2, 2, 3, 3)), []);
  });
});
