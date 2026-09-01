import assert from "node:assert/strict";
import test from "node:test";

import { findLessonVoiceIssues } from "#nakafa-content/voice-scan";

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
test("rejects attention fillers and formulaic utility transitions", () => {
  const samples = {
    de: "Es ist wichtig, die Regel zu verstehen. Hier wird die Ableitung nützlich.",
    en: "Remember that the order matters. This is where integration becomes useful.",
    id: "Ingat bahwa urutannya penting. Di sinilah integral berperan.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["formulaic-attention-filler", "formulaic-utility-transition"]
    );
  }
});
test("rejects generic tips simplification and abstraction claims", () => {
  const samples = {
    de: "Hilfreiche Kontrollen:\nDer Einfachheit halber verwenden wir Einheitsvektoren.\nDas Modell macht den Begriff weniger abstrakt.",
    en: "Several useful tips:\nTo simplify, we use unit vectors.\nThe model makes the term feel less abstract.",
    id: "Beberapa tips untuk memudahkan pemahaman:\nUntuk memudahkan, kita gunakan vektor satuan.\nModel ini membuat istilah terasa kurang abstrak.",
  };
  const expectedRules = [
    "generic-tip-intro",
    "formulaic-simplification-transition",
    "vague-abstraction-relief",
  ];

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      expectedRules
    );
  }
});
test("rejects personified methods and audience understanding claims", () => {
  const samples = {
    de: "Die Formel gibt uns eine Möglichkeit. Diese Angaben helfen Lesern zu verstehen.",
    en: "The formula gives us a direct way. These details help readers understand.",
    id: "Rumus ini memberi kita cara langsung. Rincian ini membantu pembaca memahami.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["formulaic-learning-benefit", "vague-explanatory-help"]
    );
  }
});
test("rejects bare claims that a result is clear", () => {
  const samples = {
    de: "Es ist klar, dass die Ergebnisse verschieden sind.",
    en: "It is clear that the results differ.",
    id: "Terlihat jelas bahwa hasilnya berbeda.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["formulaic-observation-filler"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Pada parabola ini, perbedaannya terlihat jelas: satu garis memotong kurva dua kali."
    ).map(({ rule }) => rule),
    ["formulaic-observation-filler"]
  );

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Garis biru terlihat jelas pada latar putih karena kontras warnanya tinggi."
    ),
    []
  );
});
test("rejects complete flow and tool for reading metaphors", () => {
  const samples = {
    de: "Die Rechnung bildet eine vollständige Kette. Nutze sie als Werkzeug, um die Form zu lesen.",
    en: "The calculation follows a complete chain. Use it as a tool to read the form.",
    id: "Perhitungan membentuk satu alur lengkap. Gunakan sebagai alat untuk membaca bentuknya.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["formulaic-complete-flow", "vague-tool-for-reading"]
    );
  }
});
test("rejects motion reading and observer seat metaphors", () => {
  const samples = {
    de: "Die Bewegung wird relativ zum Bezugssystem gelesen. Der Messwert ändert sich vom Sitz des Taxis.",
    en: "Motion is read relative to a frame. The reading changes from the taxi passenger's seat.",
    id: "Gerak selalu dibaca terhadap kerangka acuan. Yang berubah adalah bacaan dari kursi taksi.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["abstract-motion-reading"]
    );
  }
});
test("rejects formulas personified as information providers", () => {
  const samples = {
    de: "Die Diskriminante gibt Informationen über die Nullstellen.",
    en: "The discriminant gives information about the roots.",
    id: "Diskriminan memberikan informasi tentang jenis akar.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["abstract-information-provider"]
    );
  }
});
test("rejects Indonesian important to understand fillers", () => {
  const source = [
    "Penting untuk memahami perbedaan kedua operasi.",
    "Sebelum melangkah lebih jauh, penting untuk membedakan ketiga sisi.",
    "Untuk memahami fungsi akar, penting untuk menentukan domainnya.",
  ].join("\n");

  assert.deepEqual(
    findLessonVoiceIssues("id", source).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [
      { line: 1, rule: "formulaic-attention-filler" },
      { line: 2, rule: "formulaic-attention-filler" },
      { line: 3, rule: "formulaic-attention-filler" },
    ]
  );

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      'Kalau pertanyaan "ke arah mana" penting untuk memahami besaran itu, kemungkinan besar besaran tersebut merupakan vektor.'
    ),
    []
  );
});
