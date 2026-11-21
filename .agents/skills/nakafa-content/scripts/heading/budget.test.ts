import { assert, describe, it } from "@effect/vitest";
import { findBudgetFindings } from "#nakafa-content/heading/budget";
import type { OutlineHeading } from "#nakafa-content/heading/outline";
import type { LessonVoiceLocale } from "#nakafa-content/voice/types";

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
function budget(
  headings: readonly OutlineHeading[],
  locale: LessonVoiceLocale = "en"
): string[] {
  return findBudgetFindings(locale, headings).map(
    ({ blocking, line, rule }) =>
      `${rule} ${blocking ? "block" : "review"} ${line}`
  );
}

describe("findBudgetFindings", () => {
  it("accepts four to six sections when related ideas are grouped into subsections", () => {
    assert.deepStrictEqual(budget(outline(2, 2, 3, 3, 2, 2)), []);
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

  it("blocks four to six flat H2 sections across every locale", () => {
    for (const locale of ["en", "id", "ms", "de"] as const) {
      assert.deepStrictEqual(
        budget(outline(2, 2, 2, 2), locale),
        ["flat-sections block 1"],
        `${locale} 4 flat`
      );
      assert.deepStrictEqual(
        budget(outline(2, 2, 2, 2, 2), locale),
        ["flat-sections block 1"],
        `${locale} 5 flat`
      );
      assert.deepStrictEqual(
        budget(outline(2, 2, 2, 2, 2, 2), locale),
        ["flat-sections block 1"],
        `${locale} 6 flat`
      );
    }
  });

  it("blocks every lone subsection across all four locales, including solution headings", () => {
    const cases: readonly (readonly [LessonVoiceLocale, string])[] = [
      ["en", "Solutions"],
      ["en", "Worked Solutions"],
      ["en", "Only Case"],
      ["id", "Kunci Jawaban"],
      ["id", "Pembahasan"],
      ["ms", "Penyelesaian"],
      ["ms", "Jalan Kerja"],
      ["de", "Lösungen"],
    ];
    for (const [locale, label] of cases) {
      const grouped = outline(2, 3, 3, 2, 2, 2, 3).map((heading, index) =>
        index === 6 ? { ...heading, label, words: label } : heading
      );
      assert.deepStrictEqual(
        budget(grouped, locale),
        ["lone-subsection block 7"],
        `${locale}: ${label}`
      );
    }
  });

  it("blocks flat pages whose only H3 is a lone solution subsection", () => {
    const cases: readonly (readonly [LessonVoiceLocale, string])[] = [
      ["en", "Worked Solutions"],
      ["id", "Pembahasan"],
      ["ms", "Jalan Kerja"],
      ["de", "Lösungen"],
    ];
    for (const [locale, label] of cases) {
      const flat = outline(2, 2, 2, 2, 3).map((heading) =>
        heading.depth === 3 ? { ...heading, label, words: label } : heading
      );
      assert.deepStrictEqual(
        budget(flat, locale),
        ["lone-subsection block 5", "flat-sections block 1"],
        `${locale}: ${label}`
      );
    }
    assert.deepStrictEqual(budget(outline(2, 2, 2, 2, 2, 2, 2, 3, 3)), []);
  });
});
