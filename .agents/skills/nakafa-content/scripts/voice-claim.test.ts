import assert from "node:assert/strict";
import test from "node:test";

import { findLessonVoiceIssues } from "#nakafa-content/voice-scan";

test("rejects surprise labels and preserves the observed contradiction", () => {
  const vague = {
    de: "Das Ergebnis war überraschend.",
    en: "The result was more surprising.",
    id: "Hasilnya lebih mengejutkan.",
  };

  for (const [locale, source] of Object.entries(vague)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["vague-surprising-result"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Sebagian hasil pengamatan tidak sesuai dengan prediksi model Thomson."
    ),
    []
  );
});

test("rejects unsupported praise for a relationship", () => {
  const sources = [
    [
      "de",
      "Es besteht eine sehr interessante Beziehung zwischen beiden Formen.",
    ],
    ["en", "There is a very interesting relationship between both forms."],
    ["id", "Ada hubungan yang sangat menarik antara kedua bentuk."],
  ] as const;

  for (const [locale, source] of sources) {
    assert.equal(
      findLessonVoiceIssues(locale, source)[0]?.rule,
      "inflated-relationship-intro"
    );
  }
});

test("rejects empty evaluative labels instead of judging the explanation", () => {
  const samples = {
    de: "Das ist ein sehr wichtiges Konzept.\nDie Matrix hat wichtige Eigenschaften.\nDrei wichtige Merkmale folgen.\nDie Umformung ergibt eine elegante Blockform.",
    en: "This is a very important result.\nThe matrix has important properties.\nThree important characteristics follow.\nThe transformation gives an elegant block form.",
    id: "Ini hasil yang sangat penting.\nMatriks memiliki sifat-sifat penting.\nAda tiga karakteristik penting.\nTransformasi memberi bentuk blok yang elegan.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      [
        "empty-evaluative-label",
        "empty-evaluative-label",
        "empty-evaluative-label",
        "empty-evaluative-label",
      ]
    );
  }
});
test("rejects a bare utility label and preserves the named operation", () => {
  const samples = {
    de: "Diese Tatsachen sind nützlich.",
    en: "These facts are useful.",
    id: "Fakta ini berguna.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["generic-bare-utility-label"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Gunakan indeks negatif untuk memilih elemen yang dihitung dari akhir data."
    ),
    []
  );
});
test("rejects robust as an unsupported quality label", () => {
  const samples = {
    de: "Die Zerlegung liefert robuste Diagnosen nahe dem Rangverlust.",
    en: "The factorization provides robust diagnostics near rank deficiency.",
    id: "Faktorisasi ini menyediakan diagnostik yang tangguh di dekat kekurangan rank.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["inflated-robust-label"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Nilai singular yang kecil menandai matriks yang hampir kehilangan rank."
    ),
    []
  );
});
test("rejects important as an empty heading label", () => {
  const samples = {
    de: "## Wichtige Eigenschaften der Matrix",
    en: "## Important Properties of the Matrix",
    id: "## Sifat Penting Matriks",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["empty-evaluative-label", "generic-important-heading"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues("id", "## Pangkat Bukan Angka Penting"),
    []
  );
});
test("rejects headings softened with help", () => {
  const samples = {
    de: "## Der Name hilft bei der Entscheidung",
    en: "## The Name Helps Decide",
    id: "## Nama Membantu Menentukan",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["softened-help-heading"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues("de", "## Grenzwertregeln helfen beim Rechnen").map(
      ({ rule }) => rule
    ),
    ["softened-help-heading"]
  );
});
test("rejects generic everyday application headings", () => {
  const samples = {
    de: "## Anwendungen im Alltag\n### Beispiele aus dem täglichen Leben\n## Anwendungen in konkreten Situationen",
    en: "## Applications in Daily Life\n### Examples of Vectors in Real Life\n## Applications in Real Situations",
    id: "## Penerapan dalam Kehidupan Harian\n### Contoh Vektor dalam Kehidupan Nyata\n## Penerapan dalam Situasi Nyata",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      [
        "generic-everyday-application-heading",
        "generic-everyday-application-heading",
        "generic-everyday-application-heading",
      ]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues("id", "## Menghitung Susunan Melingkar"),
    []
  );
});
test("rejects generic application labels in headings and descriptions", () => {
  const samples = {
    de: [
      "## Praktische Anwendungen",
      'description: "Vergleiche Regeln mit praktischen Anwendungen.",',
    ].join("\n"),
    en: [
      "## Practical Applications",
      'description: "Compare the formulas with real world applications.",',
    ].join("\n"),
    id: [
      "## Aplikasi Praktis",
      'description: "Bandingkan rumus dengan aplikasi nyata.",',
    ].join("\n"),
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["generic-application-label", "generic-application-label"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "## Menghitung Jarak dan Luas\nGunakan rumus Heron untuk menghitung luas segitiga."
    ),
    []
  );
});
test("rejects headings that only label examples", () => {
  const samples = {
    de: "## Weitere Beispiele\n### Durchgerechnetes Beispiel\n## Ein weiteres Beispiel",
    en: "### Application Example\n## Worked Examples\n### First Example",
    id: "## Contoh Soal\n### Contoh Sederhana\n## Contoh Visualisasi",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      [
        "generic-example-heading",
        "generic-example-heading",
        "generic-example-heading",
      ]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues("id", "## Menghitung Total Produksi Sepeda"),
    []
  );
});
test("rejects generic section container headings", () => {
  const samples = {
    de: "## Überblick\n### Konzept",
    en: "## Applications\n### Concept",
    id: "## Konsep Dasar\n### Konsep",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["generic-section-heading", "generic-section-heading"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "## Model Pertumbuhan Bakteri Virus dan Populasi"
    ),
    []
  );
});
test("rejects definition questions used as headings", () => {
  const samples = {
    de: "## Was ist eine Matrix",
    en: "## What Is a Matrix",
    id: "## Apa Itu Matriks",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["generic-definition-heading"]
    );
  }

  assert.deepEqual(findLessonVoiceIssues("id", "## Matriks Persegi"), []);
});
test("rejects headings that only promise understanding", () => {
  const samples = {
    de: "## Unabhängige Ereignisse verstehen",
    en: "## Understanding Independent Events",
    id: "## Memahami Kejadian Saling Bebas",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["generic-understanding-heading"]
    );
  }

  assert.deepEqual(findLessonVoiceIssues("id", "## Kejadian Saling Bebas"), []);
});
test("rejects calculation headings that do not name the task", () => {
  const samples = {
    de: "## Detaillierte Berechnung",
    en: "## Systematic Calculation Steps",
    id: "## Langkah Perhitungan Sistematis",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["generic-calculation-heading"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues("id", "## Mengembangkan Lima Faktorial"),
    []
  );
});
