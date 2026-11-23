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
it("allows standard mathematical family terminology in Indonesian and Malay", () => {
  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Integral tak tentu memuat keluarga antiturunan."
    ),
    []
  );
  assert.deepEqual(
    findLessonVoiceIssues("ms", "Kamiran ini memberi keluarga antiterbitan."),
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

  assert.deepEqual(
    findLessonVoiceIssues(
      "de",
      "Der Virus übernimmt die Zellmaschinerie der Wirtszelle."
    ).map(({ rule }) => rule),
    ["redirected-cell-machinery-metaphor"]
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

it("allows natural teacher phrasing about notation not being mere decoration", () => {
  const samples = {
    de: "Die Adjungierte ist also keine bloße Schreibweise.",
    en: "The adjoint is therefore not decorative notation.",
    id: "Adjoint bukan sekadar notasi kosong.",
    ms: "Unit itu bukan sekadar hiasan.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(findLessonVoiceIssues(locale, source), []);
  }
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

it("holds Malaysian Malay prose to the same rules", () => {
  const samples = {
    "chemical-formula-personification": "membawa dua kali jisim oksigen.",
    "decorative-integration-journey":
      "Kamiran membalikkan perjalanan itu melalui pengumpulan.",
    "decorative-picture-to-calculation":
      "Kita mengubah gambaran ini menjadi pengiraan yang tepat.",
    "decorative-recipe-metaphor": "Formula ini seperti resipi.",
    "decorative-story-metaphor": "Graf ini menceritakan hubungan dua kuantiti.",
    "formulaic-bridge-metaphor": "Kadar ialah jambatan antara jarak dan masa.",
    "formulaic-building-block-metaphor": "Atom ialah blok binaan jirim.",
    "formulaic-compass-metaphor": "Gunakan tanda sebagai kompas.",
    "known-decorative-science-heading":
      "## Kad Pengenalan Atom\n\nSetiap atom mempunyai nombor proton.",
    "redirected-cell-machinery-metaphor":
      "Virus mengambil alih jentera sel perumah.",
  };

  for (const [rule, source] of Object.entries(samples)) {
    assert.include(
      findLessonVoiceIssues("ms", source).map((issue) => issue.rule),
      rule
    );
  }
});
