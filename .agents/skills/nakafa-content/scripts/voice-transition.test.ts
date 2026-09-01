import assert from "node:assert/strict";
import test from "node:test";

import { findLessonVoiceIssues } from "#nakafa-content/voice-scan";

test("rejects stock key claims", () => {
  const samples = {
    de: "Das Schlüsselwort lautet System.",
    en: "The key word is system.",
    id: "Kata pentingnya adalah sistem.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["formulaic-key-claim"]
    );
  }
});

test("rejects generic easiest way and good news transitions", () => {
  const samples = {
    de: "Der einfachste Weg ist die Substitution. Die gute Nachricht ist, dass jede Zeile funktioniert.",
    en: "The easiest way is substitution. The good news is that every row works.",
    id: "Cara paling mudah adalah substitusi. Kabar baiknya, semua baris bisa dipakai.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["generic-easiest-way-claim", "formulaic-good-news-transition"]
    );
  }
});

test("rejects most basic way claims", () => {
  const samples = {
    de: "Die einfachste Möglichkeit ist, die Liste zu konvertieren.",
    en: "The most basic way is to convert the list.",
    id: "Cara paling dasar adalah mengonversi daftar.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["generic-easiest-way-claim"]
    );
  }
});

test("rejects fastest way claims without a measured comparison", () => {
  const samples = {
    de: "Damit kommen wir am schnellsten zum Ziel.",
    en: "The fastest way is substitution.",
    id: "Cara tercepat adalah substitusi.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["generic-easiest-way-claim"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Pada 10.000 elemen, metode B selesai dalam 8 milidetik dan metode A dalam 15 milidetik."
    ),
    []
  );
});

test("rejects stock transitions and vague procedural praise", () => {
  const samples = {
    de: [
      "Das Schlüsselwort lautet System.",
      "Diese Reihenfolge macht den Schritt sicherer.",
      "Das öffnet die Tür zur nächsten Theorie.",
      "Diese Struktur ist die Grundlage für alle späteren Rechnungen.",
    ].join("\n"),
    en: [
      "The key word is system.",
      "This order makes the step safer.",
      "That opens the door to the next theory.",
      "This structure is the foundation for every later calculation.",
    ].join("\n"),
    id: [
      "Kata pentingnya adalah sistem.",
      "Urutan ini membuat langkah lebih aman.",
      "Itulah pintu masuk ke teori berikutnya.",
      "Struktur ini menjadi dasar untuk semua perhitungan berikutnya.",
    ].join("\n"),
  };
  const expectedRules = [
    "formulaic-key-claim",
    "vague-procedural-improvement",
    "formulaic-gateway-transition",
    "inflated-foundation-claim",
  ];

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      expectedRules
    );
  }
});

test("rejects empty superlatives before a foundational result", () => {
  const samples = {
    de: "Die wichtigste Grundlage ist der Sinusgrenzwert.",
    en: "The key result for these limits is the sine limit.",
    id: "Dasar terpenting limit trigonometri adalah limit sinus.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["inflated-foundation-claim"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Ketika sudut dalam radian mendekati nol, perbandingan sinus sudut dengan sudut itu sendiri mendekati satu."
    ),
    []
  );
});

test("rejects abstract foundation transitions and preserves direct use", () => {
  const samples = {
    de: "Diese Idee bildet die Grundlage der Differentialrechnung.",
    en: "This idea is the foundation of differential calculus.",
    id: "Gagasan ini menjadi dasar kalkulus diferensial.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["inflated-foundation-claim"]
    );
  }

  const directStatements = {
    de: "Die Differentialrechnung verwendet Ableitungen, um momentane Änderungsraten zu untersuchen.",
    en: "Differential calculus uses derivatives to analyze instantaneous rates of change.",
    id: "Kalkulus diferensial menggunakan turunan untuk menganalisis laju perubahan sesaat.",
  };

  for (const [locale, source] of Object.entries(directStatements)) {
    assert.deepEqual(findLessonVoiceIssues(locale, source), []);
  }
});

test("rejects vague paths and visual ways instead of named operations", () => {
  const samples = {
    de: "Dies liefert einen Test und einen effizienten Weg. Die Regel bietet eine visuelle Möglichkeit.",
    en: "This gives both a test and an efficient route. The rule provides a visual way.",
    id: "Fakta ini memberikan uji sekaligus jalur efisien. Aturan ini memberikan cara visual.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["vague-procedural-path", "vague-visual-method"]
    );
  }
});

test("rejects abstract efficient paths", () => {
  const samples = {
    de: "Für dünn besetzte Matrizen gibt es effizientere Wege.",
    en: "Sparse matrices offer more efficient routes.",
    id: "Matriks jarang menawarkan jalur yang lebih efisien.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["abstract-efficiency-path"]
    );
  }
});
