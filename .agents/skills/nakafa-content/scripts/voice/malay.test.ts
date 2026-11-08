import { assert, it } from "@effect/vitest";

import { findLessonVoiceIssues } from "#nakafa-content/voice/scan";

/** The rule of every issue that a Malay source holds, line by line. */
function malayRules(source: string) {
  return findLessonVoiceIssues("ms", source).map(({ line, rule }) => ({
    line,
    rule,
  }));
}

it("rejects Indonesian function words and vocabulary in Malay prose", () => {
  const source = [
    "Jawapan ini betul karena kedua-dua sisi sama.",
    "Kamu bisa muat turun nota ini.",
    "Semak jawaban kamu sekali lagi.",
    "Buka tautan di bawah.",
  ].join("\n");

  assert.deepEqual(malayRules(source), [
    { line: 1, rule: "malay-indonesian-function-word" },
    { line: 2, rule: "malay-indonesian-function-word" },
    { line: 3, rule: "malay-indonesian-vocabulary" },
    { line: 4, rule: "malay-indonesian-vocabulary" },
  ]);
});

it("rejects the Indonesian -itas suffix and Indonesian science terms", () => {
  const source = [
    "Kualitas data menentukan keputusan.",
    "Dalam fisika, energi kinetik bergantung pada laju.",
    "Selesaikan pertidaksamaan kuadrat ini.",
  ].join("\n");

  assert.deepEqual(malayRules(source), [
    { line: 1, rule: "malay-indonesian-itas-suffix" },
    { line: 2, rule: "malay-indonesian-science-term" },
    { line: 3, rule: "malay-indonesian-science-term" },
  ]);
});

it("talks to the Malay learner as kamu, never as anda or awak", () => {
  assert.deepEqual(
    malayRules(
      ["Sekarang anda cuba soalan kedua.", "Awak semak jawapan tadi."].join(
        "\n"
      )
    ),
    [
      { line: 1, rule: "malay-learner-address" },
      { line: 2, rule: "malay-learner-address" },
    ]
  );
});

it("accepts standard Malaysian Malay", () => {
  const source = [
    "Jawapan ini betul kerana kedua-dua sisi sama.",
    "Kamu boleh muat turun nota ini sahaja.",
    "Kualiti data menentukan keputusan, dan tenaga kinetik bergantung pada laju.",
    "Selesaikan ketaksamaan kuadratik ini dengan kuasa dua sempurna.",
  ].join("\n");

  assert.deepEqual(malayRules(source), []);
});

it("leaves the Indonesian sibling to its own rules", () => {
  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Jawaban ini benar karena kualitas datanya baik."
    )
      .map(({ rule }) => rule)
      .filter((rule) => rule.startsWith("malay-")),
    []
  );
});
