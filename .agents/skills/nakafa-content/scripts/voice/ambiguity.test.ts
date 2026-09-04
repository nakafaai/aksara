import { assert, it } from "@effect/vitest";

import { findLessonVoiceIssues } from "#nakafa-content/voice/scan";

it("checks metadata descriptions but ignores code", () => {
  const source = [
    "export const metadata = {",
    '  title: "Direct Lesson",',
    '  description: "This method is very useful.",',
    "};",
    "",
    "```text",
    "This method is very useful.",
    "## Heading with a Colon:",
    "```",
    "",
    "<CodeBlock data={[{",
    "  code: `This method is very useful.",
    "## Heading with a Colon:`",
    "}]} />",
  ].join("\n");

  assert.deepEqual(
    findLessonVoiceIssues("en", source).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [{ line: 3, rule: "inflated-utility-claim" }]
  );
});
it("reviews an unnamed path command but preserves a named path", () => {
  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Tuliskan jalur konversinya untuk menganalisis suatu teknologi energi."
    ).map(({ rule }) => rule),
    ["indonesian-contextless-path-imperative"]
  );

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Tuliskan jalur konversi turbin angin dari gerak udara sampai listrik."
    ),
    []
  );
});
it("finds known ambiguous claims and operational calques", () => {
  const samples = {
    de: "Dazu gehören eine hohe Energiedichte und die planbare Leistung vieler Kraftwerke. Diese Vorteile beseitigen ihre Risiken nicht.",
    en: "Many plants can schedule their output. These benefits do not remove their risks.",
    id: "Kerapatan energinya dapat tinggi. Banyak pembangkit dapat menjadwalkan keluarannya. Manfaat tersebut tidak menghapus risikonya.",
  };

  assert.deepEqual(
    findLessonVoiceIssues("de", samples.de).map(({ rule }) => rule),
    ["unexplained-output-scheduling", "vague-benefit-risk-reference"]
  );
  assert.deepEqual(
    findLessonVoiceIssues("en", samples.en).map(({ rule }) => rule),
    ["unexplained-output-scheduling", "vague-benefit-risk-reference"]
  );
  assert.deepEqual(
    findLessonVoiceIssues("id", samples.id).map(({ rule }) => rule),
    [
      "indonesian-bare-modal-adjective",
      "unexplained-output-scheduling",
      "vague-benefit-risk-reference",
    ]
  );
});
it("finds a proven vague antecedent across a paragraph line", () => {
  const source = ["Manfaat tersebut tidak menghapus", "risikonya."].join("\n");

  assert.deepEqual(
    findLessonVoiceIssues("id", source).map(({ rule }) => rule),
    ["vague-benefit-risk-reference"]
  );
});
it("rejects unqualified energy density and fuel storage claims", () => {
  const samples = {
    de: "Die Energiedichte kann hoch sein. Der Brennstoff kann gelagert werden.",
    en: "Energy density can be high. The fuel can be stored.",
    id: "Kerapatan energinya dapat tinggi. Bahan bakarnya dapat disimpan.",
  };

  assert.deepEqual(
    findLessonVoiceIssues("de", samples.de).map(({ rule }) => rule),
    ["unqualified-energy-density-claim", "unqualified-fuel-storage-claim"]
  );
  assert.deepEqual(
    findLessonVoiceIssues("en", samples.en).map(({ rule }) => rule),
    ["unqualified-energy-density-claim", "unqualified-fuel-storage-claim"]
  );
  assert.deepEqual(
    findLessonVoiceIssues("id", samples.id).map(({ rule }) => rule),
    ["indonesian-bare-modal-adjective", "unqualified-fuel-storage-claim"]
  );

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Batu bara dapat ditumpuk di dekat pembangkit untuk dipakai di antara dua jadwal pengiriman."
    ),
    []
  );
});
it("rejects metaphors that make evidence carry a conclusion", () => {
  const samples = {
    de: "Kein einzelner Hinweis trägt die gesamte Schlussfolgerung.",
    en: "No single clue carries the whole conclusion.",
    id: "Tidak ada satu petunjuk yang menanggung seluruh kesimpulan.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["evidence-carrying-metaphor"]
    );
  }
});
it("rejects stock claims about what a rule allows learners to do", () => {
  const samples = {
    de: "Diese Definition ermöglicht es uns, die Basis zu wechseln.\nDie Methode ermöglicht dir eine Prüfung.\nDie Tabelle hilft uns dabei, das Muster zu sehen.",
    en: "This identity allows us to change the base.\nThe method enables you to check the result.\nThe table helps us see the pattern.\nWe need to remember that the antiderivative is arctangent.",
    id: "Identitas ini memungkinkan kita mengganti basis.\nMetode ini memungkinkan kamu memeriksa hasil.\nTabel ini membantu kita melihat polanya.\nKita perlu mengingat bahwa antiturunannya adalah arkustangen.",
  };

  assert.deepEqual(
    findLessonVoiceIssues("de", samples.de).map(({ rule }) => rule),
    [
      "formulaic-learning-benefit",
      "formulaic-learning-benefit",
      "formulaic-learning-benefit",
    ]
  );
  for (const locale of ["en", "id"] as const) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, samples[locale]).map(({ rule }) => rule),
      [
        "formulaic-learning-benefit",
        "formulaic-learning-benefit",
        "formulaic-learning-benefit",
        "vague-explanatory-help",
        "formulaic-attention-filler",
        "formulaic-learning-benefit",
      ]
    );
  }
});
it("rejects vague claims that a subject helps explain something", () => {
  const samples = {
    de: "Die Form hilft zu erklären, wie das Virus bindet.\nDas Baumdiagramm hilft, Entscheidungen zu visualisieren.",
    en: "The shape helps explain how the virus binds.\nThe tree diagram helps visualize each decision.",
    id: "Bentuk membantu menjelaskan cara virus mengikat sel.\nDiagram pohon membantu visualisasi setiap keputusan.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["vague-explanatory-help", "vague-explanatory-help"]
    );
  }
});
it("rejects generic claims about deeper understanding", () => {
  const samples = {
    de: "Die Regel vermittelt ein tieferes Verständnis der Matrixalgebra.",
    en: "The rule provides a deeper understanding of matrix algebra.",
    id: "Aturan ini memberikan pemahaman yang lebih mendalam tentang aljabar matriks.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["generic-understanding-payoff"]
    );
  }
});
it("rejects generic learning payoff transitions", () => {
  const samples = {
    de: "Nachdem wir die Regeln kennengelernt haben, lösen wir nun Aufgaben.",
    en: "By understanding the rule, we can solve many problems.",
    id: "Dengan memahami aturan ini, kita dapat menyelesaikan banyak soal.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["formulaic-learning-payoff"]
    );
  }
});
it("rejects vague demonstratives before a conclusion", () => {
  const samples = {
    de: "Dies zeigt dass die Matrix nicht assoziativ ist.",
    en: "This shows that the matrix operation is not associative.",
    id: "Ini menunjukkan bahwa operasi matriks tidak asosiatif.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["vague-demonstrative-conclusion"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Karena kedua hasil berbeda, operasi invers tidak distributif terhadap penjumlahan."
    ),
    []
  );
});
it("flags section openings that refer to unnamed terms", () => {
  const vagueOpenings = {
    de: "Diese beiden Begriffe erscheinen oft zusammen.",
    en: "These two terms often appear together.",
    id: "Dua istilah ini sering muncul bersama.",
  };

  for (const [locale, source] of Object.entries(vagueOpenings)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["vague-section-opening-reference"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Mitigasi dan adaptasi sama-sama merespons perubahan iklim."
    ),
    []
  );
});
it("flags abstract concepts that ask questions", () => {
  const personified = {
    de: "Minderung fragt nach der Ursache.",
    en: "The law asks a different question.",
    id: "Mitigasi bertanya tentang penyebab.",
  };

  for (const [locale, source] of Object.entries(personified)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["abstract-concept-asks-question"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Siswa bertanya mengapa mitigasi mengurangi emisi."
    ),
    []
  );
});
it("flags unnamed Indonesian follow-up references but preserves named commands", () => {
  const ambiguous = [
    "Kemudian, bandingkan caranya dengan perhitungan kuartil data tunggal.",
    "7. **Periksa hasilnya.** Titik puncak harus berada di dalam domain.",
    "Gunakan rumusnya pada contoh berikut.",
  ].join("\n");

  assert.deepEqual(
    findLessonVoiceIssues("id", ambiguous).map(({ rule }) => rule),
    [
      "indonesian-unnamed-follow-up-reference",
      "indonesian-unnamed-follow-up-reference",
      "indonesian-unnamed-follow-up-reference",
    ]
  );

  const named = [
    "Hitung determinan dan periksa hasilnya.",
    "Bandingkan interpolasi data kelompok dengan perhitungan kuartil data tunggal.",
    "Gunakan rumus jumlah deret aritmetika pada contoh berikut.",
  ].join("\n");

  assert.deepEqual(findLessonVoiceIssues("id", named), []);
});
