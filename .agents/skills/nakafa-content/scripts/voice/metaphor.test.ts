import { assert, it } from "@effect/vitest";

import { findLessonVoiceIssues } from "#nakafa-content/voice/scan";

it("rejects known decorative lesson headings and preserves direct headings", () => {
  const failures = {
    de: "## Ein Ausweis für das Atom",
    en: "## An Atom Identity Card",
    id: "## Kartu Identitas Atom",
  };
  const directHeadings = {
    de: "## Angaben in einem Atomsymbol",
    en: "## Information in an Atomic Symbol",
    id: "## Informasi dalam Lambang Atom",
  };

  for (const locale of ["de", "en", "id"] as const) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, failures[locale]).map(({ rule }) => rule),
      ["known-decorative-science-heading"]
    );
    assert.deepEqual(findLessonVoiceIssues(locale, directHeadings[locale]), []);
  }
});
it("rejects mathematical family calques but preserves literal family prose", () => {
  const failures = [
    "Integral tak tentu memuat keluarga antiturunan.",
    "Untuk memperoleh satu anggota keluarga, pilih nilai a sama dengan satu.",
    "Bandingkan dua senyawa sekeluarga.",
  ];

  for (const source of failures) {
    assert.deepEqual(
      findLessonVoiceIssues("id", source).map(({ rule }) => rule),
      ["indonesian-mathematical-family-calque"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Sebuah keluarga yang terdiri dari enam anggota akan duduk berjajar untuk foto keluarga."
    ),
    []
  );
  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Gen TP53 termasuk dalam kelompok gen penekan tumor."
    ),
    []
  );
  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "> Integral tak tentu memuat keluarga antiturunan.\n> Genom virus mengambil alih kerja sel inang."
    ),
    []
  );
});
it("rejects redirected cell machinery metaphors but preserves literal mechanisms", () => {
  const failures = {
    de: "Das Virus lenkt die Maschinerie der Zelle um.",
    en: "The virus redirects the host-cell machinery.",
    id: "Genom virus mengambil alih kerja sel inang.",
  };
  const directExplanations = {
    de: "Die Wirtszelle kopiert das Virusgenom und stellt Virusproteine her.",
    en: "The host cell copies the viral genome and makes viral proteins.",
    id: "Sel inang menyalin genom virus dan membuat protein virus.",
  };

  for (const locale of ["de", "en", "id"] as const) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, failures[locale]).map(({ rule }) => rule),
      ["redirected-cell-machinery-metaphor"]
    );
    assert.deepEqual(
      findLessonVoiceIssues(locale, directExplanations[locale]),
      []
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "en",
      "Ribosomes are part of the cell machinery for protein synthesis."
    ),
    []
  );
});
it("finds stock bridge and journey metaphors", () => {
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
it("rejects decorative building block and recipe metaphors", () => {
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
it("rejects compound recipes but preserves literal cooking recipes", () => {
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
it("rejects stories used in place of mathematical comparison", () => {
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
it("rejects a journey metaphor for integration limits", () => {
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
