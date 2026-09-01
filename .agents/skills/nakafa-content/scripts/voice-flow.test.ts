import assert from "node:assert/strict";
import test from "node:test";

import { findLessonVoiceIssues } from "#nakafa-content/voice-scan";

test("rejects an abrupt command after a scenario but preserves teaching flow and exercises", () => {
  const failures = {
    de: "Angenommen, ein Grundstück hat eine gekrümmte Seite. Nähere die Fläche des Grundstücks an.",
    en: "Suppose a plot of land has one curved side. Estimate the area of the land.",
    id: "Misalkan sebidang tanah memiliki satu sisi melengkung. Perkirakan luas tanah tersebut.",
  };
  const guidedFlow = {
    de: "Stell dir ein Grundstück mit einer gekrümmten Seite vor. Um seine Fläche zu schätzen, teilen wir es in Rechtecke auf.",
    en: "Imagine a plot of land with one curved side. To estimate its area, we divide it into rectangles.",
    id: "Bayangkan sebidang tanah dengan satu sisi melengkung. Untuk memperkirakan luasnya, kita membagi tanah itu menjadi beberapa persegi panjang.",
  };

  for (const locale of ["de", "en", "id"] as const) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, failures[locale]).map(({ rule }) => rule),
      ["abrupt-scenario-imperative"]
    );
    assert.deepEqual(findLessonVoiceIssues(locale, guidedFlow[locale]), []);
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Perkirakan luas tanah yang ditunjukkan pada diagram berikut."
    ),
    []
  );

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "## Latihan\n\nMisalkan sebidang tanah memiliki satu sisi melengkung. Hitung luas tanah tersebut."
    ),
    []
  );

  const establishedExerciseHeadings = {
    de: "## Übungsaufgaben\n\nAngenommen, ein Grundstück hat eine gekrümmte Seite. Nähere die Fläche des Grundstücks an.",
    en: "## Practice Problems\n\nSuppose a plot of land has one curved side. Estimate the area of the land.",
    id: "## Latihan Soal\n\nMisalkan sebidang tanah memiliki satu sisi melengkung. Hitung luas tanah tersebut.",
  };

  for (const locale of ["de", "en", "id"] as const) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, establishedExerciseHeadings[locale]),
      []
    );
  }
});
test("rejects irrelevant fiction labels but preserves a concrete model limitation", () => {
  const failures = {
    de: "In dieser fiktiven Aufgabe berechnen wir den Funktionswert.",
    en: "In this fictional exercise, calculate the function value.",
    id: "Dalam latihan fiktif ini, hitung nilai fungsi.",
  };
  const directExplanations = {
    de: "Diese vereinfachte Formel ist keine epidemiologische Prognose.",
    en: "This simplified formula is not an epidemiological forecast.",
    id: "Rumus sederhana ini bukan ramalan epidemiologis.",
  };

  for (const locale of ["de", "en", "id"] as const) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, failures[locale]).map(({ rule }) => rule),
      ["irrelevant-fiction-label"]
    );
    assert.deepEqual(
      findLessonVoiceIssues(locale, directExplanations[locale]),
      []
    );
  }

  const modelLabels = {
    de: "Das fiktive Modell liefert diesen Wert.",
    en: "The fictional model gives this value.",
    id: "Model fiktif ini menghasilkan nilai tersebut.",
  };

  for (const locale of ["de", "en", "id"] as const) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, modelLabels[locale]).map(
        ({ rule }) => rule
      ),
      ["irrelevant-fiction-label"]
    );
  }

  const unnecessaryScenarioLabels = {
    de: "Eine hypothetische Region hat eine Million Einwohner.",
    en: "A hypothetical region has one million residents.",
    id: "Suatu wilayah hipotetis memiliki satu juta penduduk.",
  };

  for (const locale of ["de", "en", "id"] as const) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, unnecessaryScenarioLabels[locale]).map(
        ({ rule }) => rule
      ),
      ["irrelevant-fiction-label"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "en",
      "A hypothetical syllogism is a named form of logical argument."
    ),
    []
  );

  const genuineSubjectMatter = {
    de: "Der Roman verwandelt einen realen Streit in einen fiktiven Fall.",
    en: "The novel turns a real dispute into a fictional case.",
    id: "Novel itu mengubah sengketa nyata menjadi kasus fiktif.",
  };
  const quotations = {
    de: "> Die Studie bezeichnet dies als hypothetisches Modell.",
    en: "> The study calls this a hypothetical model.",
    id: "> Penelitian itu menyebutnya model fiktif.",
  };
  const modelBoundaries = {
    de: "Dieses Modell vernachlässigt den Luftwiderstand. Das Ergebnis gilt daher nur, solange der Luftwiderstand vernachlässigbar ist.",
    en: "This model ignores air resistance, so its prediction applies only while drag is negligible.",
    id: "Model ini mengabaikan hambatan udara, jadi hasilnya hanya berlaku saat gaya hambat sangat kecil.",
  };

  for (const locale of ["de", "en", "id"] as const) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, genuineSubjectMatter[locale]),
      []
    );
    assert.deepEqual(findLessonVoiceIssues(locale, quotations[locale]), []);
    assert.deepEqual(
      findLessonVoiceIssues(locale, modelBoundaries[locale]),
      []
    );
  }

  const protectedCode = [
    "`hypothetical model`",
    "```text",
    "fictional company",
    "```",
    "<CodeBlock data={[{",
    "  code: `hypothetical model`",
    "}]} />",
  ].join("\n");
  assert.deepEqual(findLessonVoiceIssues("en", protectedCode), []);
});

test("rejects vague flexibility claims", () => {
  const samples = {
    de: "Python ist sehr flexibel im Umgang mit Zahlen.",
    en: "Python is very flexible in handling numbers.",
    id: "Python sangat fleksibel dalam menangani angka.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["inflated-flexibility-claim"]
    );
  }
});
test("rejects an effective label without a stated effect", () => {
  const samples = {
    de: "Die Methode ist eine effektive Wahl für diese Aufgabe.",
    en: "The method becomes an effective choice for this task.",
    id: "Metode ini menjadi pilihan yang efektif untuk soal tersebut.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["generic-effective-choice"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Metode ini menghasilkan persamaan yang setara tanpa mencari pasangan faktor."
    ),
    []
  );
});
test("rejects fundamental as an unsupported importance label", () => {
  const samples = {
    de: "Das ist eine grundlegende Beziehung zwischen Winkel und Bogen.",
    en: "This is the fundamental relationship between angle and arc.",
    id: "Ini adalah hubungan fundamental antara sudut dan busur.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["inflated-fundamental-label"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Besar sudut pusat sama dengan besar busur yang dihadapinya."
    ),
    []
  );
});
test("rejects generic learning commands at the start of metadata descriptions", () => {
  const samples = {
    de: '  description: "Verstehe Matrizen und ihre Rechenregeln.",',
    en: '  description: "Understand matrices and their calculation rules.",',
    id: '  description: "Pahami matriks dan aturan perhitungannya.",',
  };

  for (const [locale, description] of Object.entries(samples)) {
    const source = [
      "export const metadata = {",
      '  title: "Direct Lesson",',
      description,
      "};",
    ].join("\n");
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["generic-metadata-learning-command"]
    );
  }

  const continuedDescriptions = {
    de: '    "Untersuche Matrizen anhand ihrer Rechenregeln.",',
    en: '    "Learn matrices through their calculation rules.",',
    id: '    "Pelajari matriks melalui aturan perhitungannya.",',
  };

  for (const [locale, description] of Object.entries(continuedDescriptions)) {
    const source = [
      "export const metadata = {",
      '  title: "Direct Lesson",',
      "  description:",
      description,
      "};",
    ].join("\n");
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["generic-metadata-learning-command"]
    );
  }

  const directDescriptions = {
    de: '  description: "Berechne Determinanten und prüfe das Ergebnis.",',
    en: '  description: "Calculate determinants and check the result.",',
    id: '  description: "Hitung determinan dan periksa hasilnya.",',
  };

  for (const [locale, description] of Object.entries(directDescriptions)) {
    const source = [
      "export const metadata = {",
      '  title: "Direct Lesson",',
      description,
      "};",
    ].join("\n");
    assert.deepEqual(findLessonVoiceIssues(locale, source), []);
  }
});
test("rejects formal German instructions in a lesson written in the du register", () => {
  assert.deepEqual(
    findLessonVoiceIssues(
      "de",
      "Berechnen Sie den Wert.\nStellen Sie anschließend die Gleichung auf.\nSubtrahieren oder addieren Sie volle Umdrehungen.\nWenn Sie den Wert einsetzen, erhalten Sie das Ergebnis.\nSie können beide Seiten vergleichen."
    ).map(({ rule }) => rule),
    [
      "german-formal-address",
      "german-formal-address",
      "german-formal-address",
      "german-formal-address",
      "german-formal-address",
    ]
  );

  assert.deepEqual(
    findLessonVoiceIssues(
      "de",
      "Berechne den Wert.\nStelle anschließend die Gleichung auf."
    ),
    []
  );
});
