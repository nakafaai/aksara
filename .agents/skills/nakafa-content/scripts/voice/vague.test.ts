import { assert, it } from "@effect/vitest";

import { findLessonVoiceIssues } from "#nakafa-content/voice/scan";

it("finds known vague and artificial wording with exact locations", () => {
  const source = [
    "Kalimat pembuka.",
    "Contoh ini memberi gambaran awal tentang kurva.",
    "Model ini membuat hubungan lebih nyata.",
  ].join("\n");

  assert.deepEqual(findLessonVoiceIssues("id", source), [
    {
      column: 12,
      excerpt: "Contoh ini memberi gambaran awal tentang kurva.",
      line: 2,
      rule: "vague-picture-claim",
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
    "Contoh ini memberi",
    "gambaran awal tentang kurva.",
    "",
    '<Callout description="Model ini membuat hubungan lebih nyata." />',
    '<CodeBlock code="Contoh ini memberi gambaran awal tentang kurva." />',
  ].join("\n");

  assert.deepEqual(
    findLessonVoiceIssues("id", source).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [
      { line: 1, rule: "vague-picture-claim" },
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

it("allows natural math teacher wording about values that make an equation true", () => {
  const samples = {
    en: "A root is any value of x that makes the equation true.",
    id: "Akar adalah setiap nilai x yang membuat persamaan ini benar.",
    ms: "Punca ialah nilai x yang menjadikan persamaan itu benar.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(findLessonVoiceIssues(locale, source), []);
  }
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

it("holds Malaysian Malay prose to the same rules", () => {
  const samples = {
    "vague-concrete-transition": "Kita terangkan secara lebih konkrit.",
    "vague-concretizing-claim": "Contoh ini menjadikan idea itu lebih konkrit.",
    "vague-formula-gives-those": "Rumus ini memberikan nilai-nilai itu.",
    "vague-model-fidelity": "Model kedua lebih realistik.",
    "vague-observation-claim": "Ulangan menjadikan pemerhatian lebih jelas.",
    "vague-observation-ease": "Corak ini mudah dilihat.",
    "vague-picture-claim": "Graf ini memberikan gambaran awal.",
    "vague-sensory-claim": "Animasi ini memberikan rasa gerakan.",
  };

  for (const [rule, source] of Object.entries(samples)) {
    assert.include(
      findLessonVoiceIssues("ms", source).map((issue) => issue.rule),
      rule
    );
  }
});
