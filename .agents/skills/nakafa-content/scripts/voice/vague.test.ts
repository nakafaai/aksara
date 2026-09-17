import { assert, it } from "@effect/vitest";

import { findLessonVoiceIssues } from "#nakafa-content/voice/scan";

it("finds known vague and artificial wording with exact locations", () => {
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

it("finds proven prose across soft wraps and learner-visible props", () => {
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

it("rejects vague picture claims but accepts a concrete impression warning", () => {
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

it("rejects an equation truth without an operational check", () => {
  const samples = {
    en: "A root is any value of x that makes the equation true.",
    id: "Akar adalah setiap nilai x yang membuat persamaan tersebut benar.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["vague-equation-truth"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Kalau kamu masukkan ke persamaan, ruas kiri dan ruas kanannya sama."
    ),
    []
  );
  assert.deepEqual(
    findLessonVoiceIssues("en", "Plug it in and both sides match."),
    []
  );
});

it("rejects a formula that only gives those values", () => {
  const samples = {
    en: "The quadratic formula gives those values.",
    id: "Rumus kuadrat memberikan nilai-nilai tersebut.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["vague-formula-gives-those"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Rumus kuadrat menghitung kedua akar itu langsung dari a, b, dan c."
    ),
    []
  );
  assert.deepEqual(
    findLessonVoiceIssues(
      "en",
      "The quadratic formula computes both roots directly."
    ),
    []
  );
});
