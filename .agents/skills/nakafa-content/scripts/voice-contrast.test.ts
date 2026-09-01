import assert from "node:assert/strict";
import test from "node:test";

import { findLessonVoiceIssues } from "#nakafa-content/voice-scan";

test("rejects the compressed renewable timescale contrast", () => {
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

test("preserves direct timescale explanations and factual negation", () => {
  const direct = {
    de: "Natürliche Prozesse stellen erneuerbare Energiequellen wieder bereit. Fossile Brennstoffe entstehen über Millionen Jahre. Zwei ist keine ungerade Zahl.",
    en: "A renewable energy source can be replenished by natural processes. Fossil fuels take millions of years to form. Two is not an odd number.",
    id: "Proses alam dapat menyediakan kembali sumber energi terbarukan. Bahan bakar fosil memerlukan jutaan tahun untuk terbentuk. Dua bukan bilangan ganjil.",
  };

  for (const [locale, source] of Object.entries(direct)) {
    assert.deepEqual(findLessonVoiceIssues(locale, source), []);
  }
});

test("rejects rhetorical not just variants without banning not", () => {
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
