import assert from "node:assert/strict";
import test from "node:test";

import { findLessonVoiceIssues } from "#nakafa-content/voice-scan";

test("finds known vague and artificial wording with exact locations", () => {
  const source = [
    "Kalimat pembuka.",
    "Syarat bukan hiasan setelah rumus.",
    "Model ini membuat hubungan lebih nyata.",
  ].join("\n");

  assert.deepEqual(findLessonVoiceIssues("id", source), [
    {
      column: 8,
      excerpt: "Syarat bukan hiasan setelah rumus.",
      line: 2,
      rule: "corrective-decoration-metaphor",
    },
    {
      column: 11,
      excerpt: "Model ini membuat hubungan lebih nyata.",
      line: 3,
      rule: "vague-concretizing-claim",
    },
    {
      column: 28,
      excerpt: "Model ini membuat hubungan lebih nyata.",
      line: 3,
      rule: "vague-model-fidelity",
    },
  ]);
});
test("finds proven prose across soft wraps and learner-visible props", () => {
  const source = [
    "Syarat bukan",
    "hiasan setelah rumus.",
    "",
    '<Callout description="Model ini membuat hubungan lebih nyata." />',
    '<CodeBlock code="Syarat bukan hiasan setelah rumus." />',
  ].join("\n");

  assert.deepEqual(
    findLessonVoiceIssues("id", source).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [
      { line: 1, rule: "corrective-decoration-metaphor" },
      { line: 4, rule: "vague-concretizing-claim" },
      { line: 4, rule: "vague-model-fidelity" },
    ]
  );
});
test("accepts direct explanations and factual negation", () => {
  const samples = {
    de: "Die Bedingung legt fest, wann das Gesetz gilt. Zwei ist keine ungerade Zahl.",
    en: "The condition states when the rule applies. Two is not an odd number.",
    id: "Syarat menentukan kapan sifat ini berlaku. Dua bukan bilangan ganjil.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(findLessonVoiceIssues(locale, source), []);
  }
});
test("rejects corrective decoration metaphors with inserted qualifiers", () => {
  const samples = {
    de: "Die Adjungierte ist also keine bloße Schreibweise.",
    en: "The adjoint is therefore not decorative notation.",
    id: "Adjoint bukan sekadar notasi kosong.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["corrective-decoration-metaphor"]
    );
  }
});
test("rejects vague picture claims but accepts a concrete impression warning", () => {
  const samples = {
    de: "Die Beispiele liefern uns ein erstes Bild der Kurve.",
    en: "The examples give us a first picture of the curve.",
    id: "Contoh ini memberi gambaran awal tentang kurva.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["vague-picture-claim"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Tuliskan ketidakpastian tanpa memberi kesan terlalu pasti."
    ),
    []
  );
});
test("rejects a picture metaphor used in place of the calculation", () => {
  const samples = {
    de: "Die Geometrie verwandelt dieses Bild in eine genaue Rechnung.",
    en: "Geometry turns this picture into a reliable calculation.",
    id: "Geometri mengubah gambaran tersebut menjadi perhitungan yang pasti.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["decorative-picture-to-calculation"]
    );
  }
});
test("rejects accidentally repeated words", () => {
  const samples = {
    de: "Die Matrix hat eine injektive injektive Abbildung.",
    en: "Use the smallest positive value value.",
    id: "Gunakan nilai yang yang paling kecil.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["duplicate-adjacent-word"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues("id", "Gunakan nilai positif yang paling kecil."),
    []
  );
  assert.deepEqual(
    findLessonVoiceIssues(
      "de",
      "Ein Objekt, auf das das Tupel verweist, kann veränderlich sein."
    ),
    []
  );
  assert.deepEqual(findLessonVoiceIssues("id", "## Radius dan Rerata"), []);
});
