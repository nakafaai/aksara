import { assert, it } from "@effect/vitest";

import { findLessonVoiceIssues } from "#nakafa-content/voice/scan";

it("rejects prose that narrates the lesson structure", () => {
  const cases = [
    ["id", "Subbagian di bawah ini mengikuti urutan sebuah program."],
    ["en", "The two sections below cover writing and redirecting output."],
    ["de", "Die Abschnitte unten zeigen die Konstruktoren int und float."],
    ["de", "In diesem Abschnitt vergleichen wir beide Notationen."],
    ["de", "Der nächste Abschnitt behandelt den divergenten Fall."],
    ["en", "The section teaches the order of the steps."],
    ["id", "Setiap pembahasan dimulai dari bentuk yang sesuai."],
    ["en", "We can examine each chemical process in the following order."],
    ["id", "Kita dapat memeriksa setiap proses kimia dengan urutan berikut."],
    ["de", "Wir prüfen jeden Prozess in der folgenden Reihenfolge."],
    ["de", "Gehe bei einer Sachaufgabe in dieser Reihenfolge vor:"],
    ["de", "Für diese Gleichung gehen wir in dieser Reihenfolge vor:"],
    ["en", "The pattern stays the same across the whole lesson."],
    ["id", "Ini berlaku di sepanjang pelajaran ini."],
    ["de", "Das Muster bleibt über die ganze Lektion gleich."],
    ["en", "The two subsections below cover writing."],
    ["id", "Pembahasan berikut membahas gaya gesek pada bidang miring."],
  ] as const;

  for (const [locale, rejected] of cases) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, rejected).map(({ rule }) => rule),
      ["lesson-structure-narration"]
    );
  }
});

it("keeps a sequence frame that names the required operand order", () => {
  const samples = [
    ["de", "Jeder Abschnitt zählt mit.\nTrenne die Probe in drei Abschnitte."],
    ["en", "A conic section comes from a cone.\nA cross-section is flat."],
    [
      "id",
      "Bagian tersebut adalah perbandingan.\nBagian ini menunjukkan hasil.",
    ],
    ["de", "Die Rechnung verwendet im folgenden Beispiel den gerundeten Wert."],
    ["de", "A und B können in dieser Reihenfolge nur multipliziert werden."],
    ["de", "In dieser Reihenfolge multipliziert werden A und B."],
    ["en", "Arrange the numbers in the following order: 3, 7, 11."],
  ] as const;

  for (const [locale, source] of samples) {
    assert.deepEqual(findLessonVoiceIssues(locale, source), []);
  }
});

it("rejects the nominalized German sequence adverb", () => {
  const samples = [
    "Die Rechnung verwendet im Folgenden den gerundeten Wert.",
    "Im Folgenden wird der gerundete Wert verwendet.",
  ];

  for (const source of samples) {
    assert.deepEqual(
      findLessonVoiceIssues("de", source).map(({ rule }) => rule),
      ["german-bare-im-folgenden"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "de",
      "Die Rechnung verwendet im folgenden Beispiel den gerundeten Wert."
    ),
    []
  );
});
