import { assert, it } from "@effect/vitest";

import { findLessonVoiceIssues } from "#nakafa-content/voice/scan";

it("rejects rank exposure metaphors and preserves named rank tests", () => {
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
it("rejects a translated natural rank revealing label but preserves the technical term", () => {
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
it("rejects decorative bread metaphors for programming slices", () => {
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
it("rejects raw material metaphors for adaptation", () => {
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
it("rejects the formulaic world of introduction", () => {
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
it("rejects formulaic makes sense justifications", () => {
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
it("rejects values that metaphorically capture a mathematical change", () => {
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

it("rejects chemical formulas described as carrying or needing quantities", () => {
  const failures = {
    de: '<InlineMath math="\\mathrm{H_2O_2}" /> trägt die doppelte Sauerstoffmasse.',
    en: '<InlineMath math="\\mathrm{H_2O_2}" /> carries twice the oxygen mass.',
    id: '<InlineMath math="\\mathrm{H_2O_2}" /> membawa dua kali massa oksigen.',
  };
  const directExplanations = {
    de: '<InlineMath math="\\mathrm{H_2O_2}" /> enthält die doppelte Sauerstoffmasse.',
    en: '<InlineMath math="\\mathrm{H_2O_2}" /> contains twice the oxygen mass.',
    id: '<InlineMath math="\\mathrm{H_2O_2}" /> mengandung dua kali massa oksigen.',
  };

  for (const locale of ["de", "en", "id"] as const) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, failures[locale]).map(({ rule }) => rule),
      ["chemical-formula-personification"]
    );
    assert.deepEqual(
      findLessonVoiceIssues(locale, directExplanations[locale]),
      []
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Truk membawa dua kali massa pasir dibandingkan mobil bak terbuka."
    ),
    []
  );
});
