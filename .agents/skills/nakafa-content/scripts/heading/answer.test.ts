import { assert, describe, it } from "@effect/vitest";
import {
  ANSWER_HEADINGS,
  findAnswerStructureFindings,
  isCleanPartHeading,
} from "#nakafa-content/heading/answer";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import type { LessonVoiceLocale } from "#nakafa-content/voice/types";

/** Builds a valid single-question answer in one locale. */
function singleAnswer(locale: LessonVoiceLocale, subStep = ""): string {
  const [given, asked, solution, answer] = ANSWER_HEADINGS[locale];
  return [
    `# ${given}`,
    "",
    "Data soal.",
    "",
    `# ${asked}`,
    "",
    "Target soal.",
    "",
    `# ${solution}`,
    "",
    "Langkah utama.",
    subStep,
    `# ${answer}`,
    "",
    "Hasil akhir.",
  ].join("\n");
}

describe("isCleanPartHeading", () => {
  it("accepts clean part headings without colons or extra titles", () => {
    assert.isTrue(isCleanPartHeading("id", "Bagian a"));
    assert.isTrue(isCleanPartHeading("en", "Part 1.2"));
    assert.isTrue(isCleanPartHeading("ms", "Bahagian 2a"));
    assert.isTrue(isCleanPartHeading("de", "Teil b"));
    assert.isFalse(isCleanPartHeading("id", "Bagian a: Turunan"));
    assert.isFalse(isCleanPartHeading("de", "Teil a: Ableitung"));
    assert.isFalse(isCleanPartHeading("en", "Part a Derivative"));
  });
});

describe("findAnswerStructureFindings", () => {
  it("accepts valid single-question answers in all four locales with optional H2 under solution", () => {
    for (const locale of ["id", "en", "ms", "de"] as const) {
      const source = singleAnswer(
        locale,
        "\n## Langkah awal\n\nHitung dulu.\n"
      );
      assert.deepStrictEqual(
        findAnswerStructureFindings(
          locale,
          source,
          parseLessonMdx(source),
          false
        ),
        [],
        locale
      );
    }
  });

  it("accepts valid multi-part answers with four H2 headings per part and optional H3 under solution", () => {
    const source = [
      "# Bagian a",
      "",
      "## Diketahui",
      "",
      "Nilai awal.",
      "",
      "## Ditanyakan",
      "",
      "Turunan pertama.",
      "",
      "## Penyelesaian",
      "",
      "### Aturan rantai",
      "",
      "Terapkan aturan rantai.",
      "",
      "## Jawaban",
      "",
      "Hasil bagian pertama.",
      "",
      "# Bagian 1.2",
      "",
      "## Diketahui",
      "",
      "Nilai kedua.",
      "",
      "## Ditanyakan",
      "",
      "Nilai maksimum.",
      "",
      "## Penyelesaian",
      "",
      "Gunakan syarat stasioner.",
      "",
      "## Jawaban",
      "",
      "Hasil bagian kedua.",
    ].join("\n");

    assert.deepStrictEqual(
      findAnswerStructureFindings("id", source, parseLessonMdx(source), true),
      []
    );
  });

  it("rejects colons, wrong heading order, sub-steps outside solution, and excessive depth", () => {
    const badSingle = [
      "# Diketahui",
      "",
      "## Rincian: salah tempat",
      "",
      "Isi.",
      "",
      "# Penyelesaian",
      "",
      "### Terlalu dalam",
      "",
      "Isi.",
      "",
      "# Jawaban",
      "",
      "Selesai.",
    ].join("\n");

    const singleRules = findAnswerStructureFindings(
      "id",
      badSingle,
      parseLessonMdx(badSingle),
      false
    ).map(({ rule }) => rule);
    assert.deepStrictEqual(singleRules, [
      "heading-symbol",
      "answer-heading-structure",
      "answer-heading-depth",
      "answer-heading-depth",
    ]);

    const badPart = [
      "# Bagian a: Turunan",
      "",
      "## Diketahui",
      "",
      "Isi.",
    ].join("\n");
    const partRules = findAnswerStructureFindings(
      "id",
      badPart,
      parseLessonMdx(badPart),
      true
    ).map(({ rule }) => rule);
    assert.deepStrictEqual(partRules, [
      "heading-symbol",
      "answer-heading-structure",
    ]);

    const emptyMultiPart = "## Diketahui\n\nIsi.\n";
    assert.deepStrictEqual(
      findAnswerStructureFindings(
        "id",
        emptyMultiPart,
        parseLessonMdx(emptyMultiPart),
        true
      ).map(({ rule }) => rule),
      ["answer-heading-structure"]
    );

    const noHeadingsSingle = "Paragraf saja.\n";
    assert.deepStrictEqual(
      findAnswerStructureFindings(
        "id",
        noHeadingsSingle,
        parseLessonMdx(noHeadingsSingle),
        false
      ).map(({ rule }) => rule),
      ["answer-heading-structure"]
    );

    const deepPart = [
      "# Part a",
      "",
      "## Given",
      "",
      "Data.",
      "",
      "## Asked",
      "",
      "Target.",
      "",
      "## Solution",
      "",
      "### Step one",
      "",
      "#### Too deep",
      "",
      "## Answer",
      "",
      "Done.",
    ].join("\n");
    assert.deepStrictEqual(
      findAnswerStructureFindings(
        "en",
        deepPart,
        parseLessonMdx(deepPart),
        true
      ).map(({ rule }) => rule),
      ["answer-heading-depth"]
    );
  });

  it("allows required hyphens like Rata-rata and x-Axis in answer sub-headings", () => {
    const idSource = singleAnswer(
      "id",
      "\n## Kelajuan Rata-rata\n\nHitung dulu.\n"
    );
    const enSource = singleAnswer("en", "\n## Shift Along x-Axis\n\nShift.\n");
    assert.deepStrictEqual(
      findAnswerStructureFindings(
        "id",
        idSource,
        parseLessonMdx(idSource),
        false
      ),
      []
    );
    assert.deepStrictEqual(
      findAnswerStructureFindings(
        "en",
        enSource,
        parseLessonMdx(enSource),
        false
      ),
      []
    );
  });
});
