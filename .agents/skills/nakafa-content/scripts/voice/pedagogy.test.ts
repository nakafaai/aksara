import { assert, it } from "@effect/vitest";

import { findLessonVoiceIssues } from "#nakafa-content/voice/scan";

it("rejects vague claims that a result is easy to see", () => {
  const samples = {
    de: "In dieser Form ist der Unterschied leichter zu sehen.",
    en: "This form makes the difference easier to see.",
    id: "Dalam bentuk ini, perbedaannya lebih mudah terlihat.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["vague-observation-ease"]
    );
  }
});
it("rejects personified teaching aids and vague metawriting", () => {
  const samples = {
    de: [
      "Dieser Vergleich lehrt uns die Dosierung.",
      "| Ziel | Chemische Lektüre |",
      "Prüfe weiter, bis die Beziehung sichtbar ist.",
      "Diese Tabelle ist keine neue Merkliste.",
      "## Beschleunigung auf einen Blick",
    ].join("\n"),
    en: [
      "This comparison teaches us about dosage.",
      "| Goal | What chemistry reads |",
      "Continue until the relationship is visible.",
      "This table is not a new memorization list.",
      "## A Position Sentence That Stays Clear",
    ].join("\n"),
    id: [
      "Perbandingan ini mengajarkan cara menilai dosis.",
      "| Tujuan | Yang dibaca dari kimia |",
      "Lanjutkan sampai hubungannya terlihat.",
      "Tabel itu bukan daftar hafalan baru.",
      "## Membaca Model secara Ringkas",
    ].join("\n"),
  };

  const expectedRules = [
    "formulaic-instructional-personification",
    "vague-interpretive-label",
    "vague-visibility-endpoint",
    "metawriting-disclaimer",
    "vague-heading-sensory",
  ];

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      expectedRules
    );
  }
});
it("rejects generic importance headings tables and attention labels", () => {
  const samples = {
    de: [
      "## Warum die Form nützlich ist",
      "| Prüfung | Warum sie wichtig ist |",
      "**Wichtig:** Die Funktion muss bijektiv sein.",
    ].join("\n"),
    en: [
      "## Why the Constant Matters",
      "| Check | Why it matters |",
      "**Important:** The function must be bijective.",
    ].join("\n"),
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      [
        "generic-importance-heading",
        "generic-importance-table-label",
        "generic-attention-label",
      ]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "| Pemeriksaan | Mengapa penting |\n**Penting:** Fungsi harus bijektif."
    ).map(({ rule }) => rule),
    ["generic-importance-table-label", "generic-attention-label"]
  );
});
it("rejects vague utility labels instead of the actual operation", () => {
  const samples = {
    de: [
      "Wirksame Prävention beginnt beim Übertragungsweg.",
      "Die Identität ist für die Analyse nützlich.",
      "Der Satz liefert eine praktische Methode zur Berechnung.",
      "Die Gleichung bietet einen direkten Weg zur Prüfung.",
      "Der Energiefluss ist eine zentrale Idee.",
      "Die Bindung ist ein wichtiger Ausgangspunkt.",
    ].join("\n"),
    en: [
      "Effective prevention starts with the transmission route.",
      "The identity is useful for analysis.",
      "The theorem provides a practical method for calculation.",
      "The equation provides a direct way to test the point.",
      "Energy flow is a central idea.",
      "Binding is an important starting point.",
    ].join("\n"),
    id: [
      "Pencegahan efektif dimulai dari jalur penularan.",
      "Identitas ini berguna untuk analisis.",
      "Teorema ini memberikan metode praktis untuk menghitung.",
      "Persamaan ini memberikan cara langsung untuk menguji titik.",
      "Aliran energi adalah ide utama.",
      "Pengikatan menjadi awal yang penting.",
    ].join("\n"),
  };

  const expectedRules = [
    "generic-effective-opener",
    "generic-analysis-utility",
    "generic-practical-method",
    "formulaic-direct-way-provider",
    "empty-big-idea-label",
    "empty-evaluative-label",
  ];

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      expectedRules
    );
  }
});
it("rejects unsupported method praise and stiff process labels", () => {
  const samples = {
    de: [
      "Die sicherste Formel zum Ablesen der Ladung lautet q gleich p minus e.",
      "Dieses Verfahren ist effizienter und übersichtlicher.",
      "Die gebräuchlichste Methode ist die Faktorisierung.",
      "Diese Methode beinhaltet den Prozess der Umformung.",
      "Dadurch bleiben mehr Informationen in den kleinen Richtungen erhalten.",
    ].join("\n"),
    en: [
      "The safest way to read the charge is q equals p minus e.",
      "This is a more efficient and simpler method.",
      "The most common method is factoring.",
      "This method involves the process of transforming the equation.",
      "These methods preserve more information in small singular directions.",
    ].join("\n"),
    id: [
      "Rumus paling aman untuk membaca muatan adalah q sama dengan p dikurangi e.",
      "Cara ini lebih efisien dan sederhana.",
      "Metode yang paling umum digunakan adalah pemfaktoran.",
      "Metode ini melibatkan proses mengubah persamaan.",
      "Cara ini mempertahankan lebih banyak informasi pada arah singular kecil.",
    ].join("\n"),
  };

  const expectedRules = [
    "generic-safety-superlative",
    "stacked-comparative-praise",
    "generic-most-common-method",
    "stiff-process-nominalization",
    "vague-information-preservation",
  ];

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      expectedRules
    );
  }
});
it("keeps comparisons that name the quantity mechanism or prevented error", () => {
  const samples = {
    de: "Diese Variante senkt die Säurekonzentration von 2 mol/L auf 0,5 mol/L. atan2 verwendet beide Vorzeichen und wählt dadurch den richtigen Quadranten.",
    en: "Reading line by line uses less memory because the program does not load the whole file. atan2 uses both signs to select the correct quadrant.",
    id: "Pilihan B menurunkan konsentrasi asam dari 2 mol/L menjadi 0,5 mol/L. atan2 memakai tanda kedua komponen untuk menentukan kuadran.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(findLessonVoiceIssues(locale, source), []);
  }
});
it("rejects repeated mechanical conclusion and explanation openers", () => {
  const samples = {
    de: [
      "Daher ist x gleich 1.",
      "Deshalb ist y gleich 2.",
      "Daher ist z gleich 3.",
      "Das bedeutet, dass a positiv ist.",
      "Dies bedeutet, dass b positiv ist.",
      "Das bedeutet, dass c positiv ist.",
    ].join("\n"),
    en: [
      "Therefore, x equals 1.",
      "Thus, y equals 2.",
      "The calculation gives: z = 3.",
      "This means a is positive.",
      "This means b is positive.",
      "This means c is positive.",
    ].join("\n"),
    id: [
      "Dengan demikian, x sama dengan 1.",
      "Oleh karena itu, y sama dengan 2.",
      "Dengan demikian, z sama dengan 3.",
      "Ini berarti a positif.",
      "Ini berarti b positif.",
      "Ini berarti c positif.",
    ].join("\n"),
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["repeated-conclusion-opener", "repeated-explanatory-opener"]
    );
  }
});
it("allows two conclusion openers when each step needs one", () => {
  const samples = {
    de: "Daher ist x gleich 1.\nDeshalb ist y gleich 2.",
    en: "Therefore, x equals 1.\nThus, y equals 2.",
    id: "Dengan demikian, x sama dengan 1.\nOleh karena itu, y sama dengan 2.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(findLessonVoiceIssues(locale, source), []);
  }
});
it("rejects generic real world labels and picture transformations", () => {
  const samples = {
    de: "## Reales Beispiel mit Messdaten\nSo wird aus dem Bild eine physikalische Untersuchung.",
    en: "## Real Example with Measurements\nThe picture becomes a physical investigation.",
    id: "## Contoh Nyata dengan Data Ukur\nGambar ini menjadi penyelidikan fisika.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["generic-real-world-label", "decorative-picture-to-calculation"]
    );
  }
});
