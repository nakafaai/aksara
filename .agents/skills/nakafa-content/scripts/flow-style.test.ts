import assert from "node:assert/strict";
import test from "node:test";

import { findLessonVoiceIssues } from "#nakafa-content/voice-scan";

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

test("rejects questions assigned to abstract lesson concepts", () => {
  const failures = {
    de: "Die Atomökonomie fragt, welcher Anteil der Atome im Produkt landet.",
    en: "Atom economy asks what fraction of the atoms enters the product.",
    id: "Ekonomi atom bertanya berapa bagian atom yang masuk ke produk.",
  };
  const directExplanations = {
    de: "Die Atomökonomie misst den Anteil der Atome, die im Produkt landen.",
    en: "Atom economy measures the fraction of atoms that enter the product.",
    id: "Ekonomi atom mengukur bagian atom yang masuk ke produk.",
  };

  for (const locale of ["de", "en", "id"] as const) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, failures[locale]).map(({ rule }) => rule),
      ["abstract-concept-question-personification"]
    );
    assert.deepEqual(
      findLessonVoiceIssues(locale, directExplanations[locale]),
      []
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "en",
      "If the question asks for distance, add the lengths of all path segments."
    ),
    []
  );
  assert.deepEqual(
    findLessonVoiceIssues(
      "en",
      "A for loop asks its iterator for the next value."
    ),
    []
  );
});

test("rejects empty example prefaces and unsupported evaluation labels", () => {
  const failures = {
    de: "Um dieses Konzept besser zu verstehen, betrachte einige Beispiele. Dies ist das häufigste Beispiel.",
    en: "To better understand this concept, look at some examples. This is the most common example.",
    id: "Untuk lebih memahami konsep ini, lihat beberapa contoh. Pertanyaan menarik: apakah polanya tetap?",
  };
  const directExplanations = {
    de: "Die nächsten zwei Beispiele multiplizieren jeden Eintrag mit demselben Skalar.",
    en: "The next two examples multiply every entry by the same scalar.",
    id: "Dua contoh berikut mengalikan setiap entri dengan skalar yang sama.",
  };

  for (const locale of ["de", "en", "id"] as const) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, failures[locale]).map(({ rule }) => rule),
      ["empty-example-preface", "unsupported-evaluative-preface"]
    );
    assert.deepEqual(
      findLessonVoiceIssues(locale, directExplanations[locale]),
      []
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "en",
      "Blood type O was the most common result in this sample."
    ),
    []
  );
  assert.deepEqual(
    findLessonVoiceIssues(
      "en",
      "This is the most common example in our 100-row sample, where it occurs 60 times."
    ),
    []
  );
});
