import { assert, describe, it } from "@effect/vitest";
import { findFinalAnswerQualityFindings } from "#nakafa-content/heading/final";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import type { LessonVoiceLocale } from "#nakafa-content/voice/types";

/** Formats rule, tier, and line for concise assertions. */
function finalFindings(
  source: string,
  locale: LessonVoiceLocale = "en",
  isParts = false
): string[] {
  return findFinalAnswerQualityFindings(
    locale,
    parseLessonMdx(source),
    isParts
  ).map(
    ({ blocking, line, rule }) =>
      `${rule} ${blocking ? "block" : "review"} ${line}`
  );
}

describe("findFinalAnswerQualityFindings", () => {
  it("accepts concrete highlighted final answers with bold emphasis or display math", () => {
    const withBold = [
      "# Given",
      "",
      "The circle has radius 3.",
      "",
      "# Answer",
      "",
      'Therefore, the **correct area** is **<InlineMath math="9\\pi" />**.',
    ].join("\n");
    assert.deepStrictEqual(finalFindings(withBold, "en"), []);

    const withBlockMath = [
      "# Diketahui",
      "",
      "Jari-jari lingkaran adalah 3.",
      "",
      "# Jawaban",
      "",
      "Jadi, luas lingkaran adalah:",
      "",
      '<BlockMath math="L = 9\\pi" />',
    ].join("\n");
    assert.deepStrictEqual(finalFindings(withBlockMath, "id"), []);

    const withMathContainer = [
      "# Teil a",
      "",
      "## Antwort",
      "",
      "<MathContainer>",
      '<BlockMath math="x = 4" />',
      "</MathContainer>",
      "",
      "# Teil b",
      "",
      "## Antwort",
      "",
      "Das Ergebnis ist **8**.",
    ].join("\n");
    assert.deepStrictEqual(finalFindings(withMathContainer, "de", true), []);
  });

  it("blocks vague boilerplate and unhighlighted final answers across locales", () => {
    const vagueId = [
      "# Jawaban",
      "",
      "Dengan menggabungkan seluruh langkah di atas, diperoleh **hasil akhir** yang sesuai dengan pertanyaan soal.",
    ].join("\n");
    assert.deepStrictEqual(finalFindings(vagueId, "id"), [
      "vague-final-answer block 1",
    ]);

    const unhighlightedEn = [
      "# Answer",
      "",
      "The total distance is 12 km.",
    ].join("\n");
    assert.deepStrictEqual(finalFindings(unhighlightedEn, "en"), [
      "answer-missing-highlight block 1",
    ]);

    const bothMs = [
      "# Bahagian a",
      "",
      "## Jawapan",
      "",
      "Hasil akhir yang sesuai dengan soalan.",
    ].join("\n");
    assert.deepStrictEqual(finalFindings(bothMs, "ms", true), [
      "vague-final-answer block 3",
      "answer-missing-highlight block 3",
    ]);
  });

  it("handles synthetic trees, inline JSX display math, and heading resets cleanly", () => {
    assert.deepStrictEqual(
      findFinalAnswerQualityFindings("en", { type: "root" }, false),
      []
    );
    assert.deepStrictEqual(
      findFinalAnswerQualityFindings(
        "en",
        {
          children: [
            {
              children: [{ type: "text", value: "Other" }],
              type: "heading",
            },
            {
              children: [{ type: "text", value: "Answer" }],
              depth: 1,
              type: "heading",
            },
            {
              children: [{ type: "text", value: "Detail" }],
              depth: 2,
              type: "heading",
            },
            {
              children: [
                { name: "BlockMath", type: "mdxJsxTextElement" },
                { type: "strong" },
              ],
              type: "paragraph",
            },
            {
              children: [{ type: "text", value: "After" }],
              depth: 1,
              type: "heading",
            },
            {
              children: [{ type: "text", value: "Ignored trailing note." }],
              type: "paragraph",
            },
          ],
          type: "root",
        },
        false
      ),
      []
    );
    assert.deepStrictEqual(
      findFinalAnswerQualityFindings(
        "en",
        {
          children: [
            {
              children: [{ type: "text", value: "Answer" }],
              depth: 1,
              type: "heading",
            },
            {
              children: [{ type: "text", value: "Plain text without bold." }],
              type: "paragraph",
            },
          ],
          type: "root",
        },
        false
      ).map(({ line, rule }) => [line, rule]),
      [[1, "answer-missing-highlight"]]
    );
  });
});
