import { assert, it } from "@effect/vitest";

import { findLessonVoiceIssues } from "#nakafa-content/voice/scan";

it("blocks a look pointer that names nothing to notice", () => {
  const samples = {
    de: "Betrachte die folgende Matrix:",
    en: "Consider the following matrix:",
    id: "Perhatikan matriks berikut:",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["bare-look-pointer"]
    );
  }
});

it("blocks the counted caption that repeats the block below it", () => {
  const samples = {
    de: "Zwei Formeln berechnen die Sektorfläche folgendermaßen:",
    en: "Two formulas give the sector area below:",
    id: "Dua rumus berikut menghitung luas juring:",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["counted-pointer-caption"]
    );
  }
});

it("keeps a pointer that states the condition or the instrument valid", () => {
  const valid = {
    de: [
      "Zwei Formeln berechnen die Sektorfläche, wenn die Winkeleinheit feststeht:",
      "Prüfe jeden Reaktionstyp mit der folgenden Tabelle.",
      "Die folgenden Aussagen sind äquivalent:",
    ],
    en: [
      "Two formulas compute the sector area when the angle unit decides which one applies:",
      "The following statements are equivalent:",
      "The rule decides which numbers appear, as in the two lists below.",
    ],
    id: [
      "Dua rumus berikut menghitung luas juring bila satuan sudutnya berbeda:",
      "Sebelum menjelaskan arti setiap parameter hasil pencocokan, periksa hal-hal berikut:",
      "Tiga istilah berikut menjelaskan struktur matriks:",
      "Untuk matriks persegi, pernyataan berikut saling ekuivalen:",
    ],
  };

  for (const [locale, sources] of Object.entries(valid)) {
    for (const source of sources) {
      assert.deepEqual(
        findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
        [],
        `${locale}: ${source}`
      );
    }
  }
});

it("keeps a task instruction that names the learner action valid", () => {
  const samples = {
    de: "Vergleiche die beiden Vektoren und bestimme den Winkel zwischen ihnen:",
    en: "Compare the two vectors and determine the angle between them:",
    id: "Bandingkan kedua vektor itu dan tentukan sudut di antara keduanya:",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      []
    );
  }
});
