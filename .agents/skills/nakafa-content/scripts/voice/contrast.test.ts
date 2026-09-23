import { assert, it } from "@effect/vitest";

import { findLessonVoiceIssues } from "#nakafa-content/voice/scan";

it("rejects the compressed renewable timescale contrast", () => {
  const failures = {
    de: "Erneuerbare Energiequellen werden durch natürliche Prozesse innerhalb menschlicher Zeiträume wieder verfügbar. Fossile Brennstoffe entstehen dagegen über Millionen Jahre.",
    en: "A renewable energy source can be replenished by natural processes on a human time scale rather than over the millions of years required to form fossil fuels.",
    id: "Sumber energi terbarukan dapat tersedia kembali melalui proses alam dalam jangka waktu manusia, bukan jutaan tahun seperti bahan bakar fosil.",
  };

  for (const [locale, source] of Object.entries(failures)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["compressed-renewable-timescale-contrast"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Sumber energi terbarukan dapat tersedia kembali melalui proses alam dalam jangka waktu manusia,\nbukan jutaan tahun seperti bahan bakar fosil."
    ).map(({ rule }) => rule),
    ["compressed-renewable-timescale-contrast"]
  );
});

it("preserves direct timescale explanations and factual negation", () => {
  const direct = {
    de: "Natürliche Prozesse stellen erneuerbare Energiequellen wieder bereit. Fossile Brennstoffe entstehen über Millionen Jahre. Zwei ist keine ungerade Zahl.",
    en: "A renewable energy source can be replenished by natural processes. Fossil fuels take millions of years to form. Two is not an odd number.",
    id: "Proses alam dapat menyediakan kembali sumber energi terbarukan. Bahan bakar fosil memerlukan jutaan tahun untuk terbentuk. Dua bukan bilangan ganjil.",
  };

  for (const [locale, source] of Object.entries(direct)) {
    assert.deepEqual(findLessonVoiceIssues(locale, source), []);
  }
});

it("rejects rhetorical not just variants without banning not", () => {
  const failures = {
    de: "Das Ergebnis ist nicht bloß eine Zahl, sondern ein Modell.",
    en: "The result is not just a number but a model.",
    id: "Hasilnya bukan sekadar angka, tetapi sebuah model.",
  };

  for (const [locale, source] of Object.entries(failures)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["rhetorical-not-only"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues("id", "Penyebut harus tidak nol."),
    []
  );
});

it("blocks an anti-model intensifier in every locale", () => {
  const failures = {
    de: "Ein echter Ausbruch verläuft natürlich nicht so einfach.",
    en: "Real outbreaks are not this simple.",
    id: "Tentu saja, wabah yang sebenarnya tidak sesederhana ini.",
  };

  for (const [locale, source] of Object.entries(failures)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["anti-model-intensifier"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues("en", "Real outbreaks are\nnot this simple.").map(
      ({ rule }) => rule
    ),
    ["anti-model-intensifier"]
  );
});

it("keeps factual negation, definitional exclusion, and real comparison", () => {
  const samples = [
    ["en", "A valid exponential base is positive and not equal to one."],
    ["en", "The resultant is not 7 m in one straight direction."],
    ["en", "Accuracy is not simple to improve."],
    ["en", "This is not a simplification of the model."],
    ["en", "Use the `not this simple` marker only in a quotation."],
    ["de", "Die Ladung ist nicht negativ."],
    ["de", "Das Ergebnis ist nicht so genau wie der Messwert."],
    ["de", "Das ist nicht einfach zu prüfen, aber es lohnt sich."],
    ["id", "Vektor nol bukan vektor eigen."],
    ["id", "Fungsi ini bukan bijektif."],
    ["id", "Nilai itu tidak sama dengan nol."],
    ["id", "Sifatnya bukan sifat yang mudah diperiksa."],
    ["en", "A vector has not only magnitude but also direction."],
    [
      "de",
      "Ein Vektor hat nicht nur einen Betrag, sondern auch eine Richtung.",
    ],
    ["id", "Vektor tidak hanya memiliki besar, tetapi juga arah."],
  ] as const;

  for (const [locale, source] of samples) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      []
    );
  }
});
