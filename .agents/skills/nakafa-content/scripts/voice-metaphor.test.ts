import assert from "node:assert/strict";
import test from "node:test";

import { findLessonVoiceIssues } from "#nakafa-content/voice-scan";

test("finds stock bridge and journey metaphors", () => {
  const source = [
    "Konsep ini menjadi jembatan menuju materi berikutnya.",
    "Ini adalah awal perjalanan panjang menuju teori modern.",
  ].join("\n");

  assert.deepEqual(
    findLessonVoiceIssues("id", source).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [
      { line: 1, rule: "formulaic-bridge-metaphor" },
      { line: 2, rule: "stock-learning-journey" },
    ]
  );
});
test("rejects decorative building block and recipe metaphors", () => {
  const samples = {
    de: "Monome sind die Bausteine von Polynomen. Der Ablauf ähnelt einem Kochrezept.",
    en: "Monomials are the building blocks of polynomials. The steps work like a recipe.",
    id: "Monomial adalah blok penyusun polinomial. Urutannya seperti resep.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["formulaic-building-block-metaphor", "decorative-recipe-metaphor"]
    );
  }
});
test("rejects compound recipes but preserves literal cooking recipes", () => {
  const failures = {
    de: "Prüfe, ob das Rezept der Verbindung unverändert bleibt.",
    en: "Check whether the compound recipe remains fixed.",
    id: "Periksa apakah resep senyawa tetap sama.",
  };
  const literalRecipes = {
    de: "Das Kochrezept nennt Mehl und Wasser.",
    en: "The cooking recipe lists flour and water.",
    id: "Resep makanan mencantumkan tepung dan air.",
  };

  for (const locale of ["de", "en", "id"] as const) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, failures[locale]).map(({ rule }) => rule),
      ["decorative-recipe-metaphor"]
    );
    assert.deepEqual(findLessonVoiceIssues(locale, literalRecipes[locale]), []);
  }
});
test("rejects stories used in place of mathematical comparison", () => {
  const failures = {
    de: "Strecke und Verschiebung erzählen unterschiedliche Geschichten.",
    en: "Distance and displacement tell different stories.",
    id: "Jarak dan perpindahan menceritakan hal yang berbeda.",
  };
  const literalStories = {
    de: "Die Geschichte erzählt die Reise einer Schülerin.",
    en: "The story tells a student's journey.",
    id: "Cerita itu menceritakan perjalanan seorang siswa.",
  };

  for (const locale of ["de", "en", "id"] as const) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, failures[locale]).map(({ rule }) => rule),
      ["decorative-story-metaphor"]
    );
    assert.deepEqual(findLessonVoiceIssues(locale, literalStories[locale]), []);
  }
});
test("rejects a journey metaphor for integration limits", () => {
  const samples = {
    de: "Wird ein Weg von Punkt A zu Punkt B umgekehrt, wechselt auch die Akkumulation ihr Vorzeichen.",
    en: "Reversing a journey from A to B changes the accumulated value's sign.",
    id: "Membalik perjalanan dari A ke B mengubah tanda nilai akumulasinya.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["decorative-integration-journey"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Perjalanan bus dari A ke B menempuh jarak 12 kilometer."
    ),
    []
  );
});
test("rejects rank exposure metaphors and preserves named rank tests", () => {
  const failures = {
    de: "Zwei Werkzeuge legen den Rang offen.",
    en: "Two tools expose rank.",
    id: "Dua alat menyingkap peringkat.",
  };
  const directExplanations = {
    de: "Bestimme den Rang aus der Anzahl der von null verschiedenen Singulärwerte.",
    en: "Determine rank from the number of nonzero singular values.",
    id: "Tentukan peringkat dari banyak nilai singular tak nol.",
  };

  for (const locale of ["de", "en", "id"] as const) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, failures[locale]).map(({ rule }) => rule),
      ["rank-exposure-metaphor"]
    );
    assert.deepEqual(
      findLessonVoiceIssues(locale, directExplanations[locale]),
      []
    );
  }
});
test("rejects a translated natural rank revealing label but preserves the technical term", () => {
  const failures = {
    de: "Diese Zerlegung ist das natürlichere rangoffenlegende Verfahren.",
    en: "This factorization is the more natural rank-revealing choice.",
    id: "Faktorisasi ini merupakan pilihan penyingkap peringkat yang lebih alami.",
  };
  const directExplanations = {
    de: "Eine rangoffenlegende Faktorisierung schätzt den numerischen Rang.",
    en: "A rank-revealing factorization estimates numerical rank.",
    id: "Faktorisasi dengan pivoting kolom memperkirakan peringkat numerik.",
  };

  for (const locale of ["de", "en", "id"] as const) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, failures[locale]).map(({ rule }) => rule),
      ["rank-exposure-metaphor"]
    );
    assert.deepEqual(
      findLessonVoiceIssues(locale, directExplanations[locale]),
      []
    );
  }
});
test("rejects decorative bread metaphors for programming slices", () => {
  const samples = {
    de: "Wie bei einer Brotscheibe werden Anfang und Ende festgelegt.",
    en: "Like choosing a slice from a loaf of bread, you set the bounds.",
    id: "Seperti menentukan potongan pada sepotong roti, kamu memilih batasnya.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["decorative-bread-metaphor"]
    );
  }
});
test("rejects raw material metaphors for adaptation", () => {
  const samples = {
    de: "Genetische Variation ist das Ausgangsmaterial für Anpassung.",
    en: "Genetic variation supplies raw material for adaptation.",
    id: "Variasi gen menjadi bahan mentah adaptasi.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["decorative-raw-material-metaphor"]
    );
  }
});
test("rejects the formulaic world of introduction", () => {
  const samples = {
    de: "Integrale in der Welt der Physik.",
    en: "Integrals in the world of physics.",
    id: "Integral dalam dunia fisika.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["formulaic-world-of"]
    );
  }
});
test("rejects formulaic makes sense justifications", () => {
  const samples = {
    de: "Dieses Ergebnis ist sinnvoll, weil alle Fälle erfasst sind.",
    en: "This makes sense because every case is included.",
    id: "Hasil ini masuk akal karena semua kasus tercakup.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["formulaic-makes-sense-justification"]
    );
  }
});
test("rejects values that metaphorically capture a mathematical change", () => {
  const samples = {
    de: "Der Wert des Kosinus bildet diesen Übergang ab.",
    en: "The cosine value captures that change.",
    id: "Nilai kosinus menangkap perubahan itu.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["abstract-value-captures-change"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Sensor cahaya menangkap perubahan intensitas pada layar."
    ),
    []
  );
});
