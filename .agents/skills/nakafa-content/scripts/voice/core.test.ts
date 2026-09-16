import { assert, it } from "@effect/vitest";

import { findLessonVoiceIssues } from "#nakafa-content/voice/scan";

it("rejects an em dash or en dash in every learner locale", () => {
  for (const locale of ["de", "en", "id"] as const) {
    for (const codePoint of [0x20_13, 0x20_14]) {
      const mark = String.fromCodePoint(codePoint);
      assert.deepEqual(
        findLessonVoiceIssues(locale, `One thought${mark}then another.`).map(
          ({ rule }) => rule
        ),
        ["dash-character"]
      );
    }
  }

  assert.deepEqual(
    findLessonVoiceIssues("en", "Farmers aged 19 to 39 are not a majority."),
    []
  );
});

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
it("accepts direct explanations and factual negation", () => {
  const samples = {
    de: "Die Bedingung legt fest, wann das Gesetz gilt. Zwei ist keine ungerade Zahl.",
    en: "The condition states when the rule applies. Two is not an odd number.",
    id: "Syarat menentukan kapan sifat ini berlaku. Dua bukan bilangan ganjil.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(findLessonVoiceIssues(locale, source), []);
  }
});
it("rejects corrective decoration metaphors with inserted qualifiers", () => {
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
it("rejects a picture metaphor used in place of the calculation", () => {
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
it("rejects accidentally repeated words", () => {
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
it("rejects a numbered item that repeats its ordinal as a label", () => {
  const samples = {
    de: "1. Zuerst, die komplexe Zahl wird vereinfacht:",
    en: "1. First, simplify the complex number:",
    id: "1. Pertama, sederhanakan bilangan kompleksnya:",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["duplicated-list-ordinal"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "de",
      "3. **Zunächst:** die drei Potenzen bestimmen."
    ).map(({ rule }) => rule),
    ["duplicated-list-ordinal"]
  );
});

it("keeps an ordinal that names the first element of a set", () => {
  const samples = {
    de: [
      "1. Erste Ableitung ist die Steigung.",
      "1. Zuerst die Bedingung, danach der Schluss.",
    ],
    en: [
      "1. First die 3, second die 4, so the sum is 7.",
      "1. First ionization energy rises across a period.",
      "1. First term a and second term b appear in the expansion.",
      "1. First element of the set is 2.",
      "1. First line contains a brief function summary.",
      "1. **First problem with function y = x^2 + 1**",
    ],
    id: [
      "1. Pertama kali kamu melihat grafik ini, perhatikan arah kurvanya.",
      "3. Pertama kali nilai mutlak dipakai, hasilnya selalu positif.",
    ],
  } as const;

  for (const [locale, sources] of Object.entries(samples)) {
    for (const source of sources) {
      assert.deepEqual(findLessonVoiceIssues(locale, source), [], source);
    }
  }
});
