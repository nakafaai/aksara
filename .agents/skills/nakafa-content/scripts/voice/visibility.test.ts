import { assert, it } from "@effect/vitest";

import { findLessonVoiceIssues } from "#nakafa-content/voice/scan";

it("rejects abstract subjects that read an idea or state", () => {
  const samples = {
    de: "Das Diagramm liest dieselbe Idee.\nDas Gesetz liest einen Fall.",
    en: "The graph reads the same idea.\nInstantaneous speed reads the state at one time.\nThe law reads one case.",
    id: "Grafik membaca ide yang sama.\nKelajuan sesaat membaca keadaan pada satu waktu.\nHukum itu membaca satu kasus.",
  };

  assert.deepEqual(
    findLessonVoiceIssues("de", samples.de).map(({ rule }) => rule),
    ["abstract-reading-claim", "abstract-reading-claim"]
  );
  assert.deepEqual(
    findLessonVoiceIssues("en", samples.en).map(({ rule }) => rule),
    [
      "abstract-reading-claim",
      "abstract-reading-claim",
      "abstract-reading-claim",
    ]
  );
  assert.deepEqual(
    findLessonVoiceIssues("id", samples.id).map(({ rule }) => rule),
    [
      "abstract-reading-claim",
      "abstract-reading-claim",
      "abstract-reading-claim",
    ]
  );
});

it("rejects formulaic claims about making ideas visible", () => {
  const samples = {
    de: "Die Tabelle macht das Muster sichtbar. Eine Substitution kann die Grundform sichtbar machen.",
    en: "The table makes the pattern visible.",
    id: "Tabel membuat polanya terlihat.",
  };

  assert.deepEqual(
    findLessonVoiceIssues("de", samples.de).map(({ rule }) => rule),
    ["formulaic-visible-claim"]
  );
  for (const locale of ["en", "id"] as const) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, samples[locale]).map(({ rule }) => rule),
      ["formulaic-visible-claim"]
    );
  }
});

it("rejects visible abstract ideas while preserving visible objects", () => {
  const abstractSamples = {
    de: "Wir lassen Reibung weg, damit die Idee der Energiebilanz sichtbar ist.",
    en: "We omit friction so the conservation idea is visible.",
    id: "Kita mengabaikan gesekan agar ide kekekalan energi terlihat.",
  };

  for (const [locale, source] of Object.entries(abstractSamples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["abstract-visibility-purpose"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Posisikan lampu agar garis merah terlihat pada layar."
    ),
    []
  );
});

it("rejects invisible original values after grouping", () => {
  const vague = {
    de: "Die ursprünglichen Einzelwerte sind nicht mehr sichtbar, nachdem die Daten gruppiert wurden.",
    en: "The original observations are no longer visible after the data are grouped.",
    id: "Nilai asli sudah tidak terlihat setelah data dikelompokkan.",
  };

  for (const [locale, source] of Object.entries(vague)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["grouped-data-visibility-claim"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Tabel data kelompok tidak menyimpan nilai asli setiap pengamatan."
    ),
    []
  );
});

it("rejects abstract visibility claims and preserves concrete visibility", () => {
  const samples = {
    de: "Nach der Umformung wird der Zusammenhang sichtbar.\nDer Mittelwert verdeckt das Muster.",
    en: "After the rewrite, the ratio becomes visible.\nA single average can hide the pattern.",
    id: "Setelah diubah, hubungannya menjadi terlihat.\nSatu rerata dapat menyamarkan pola.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["abstract-visibility-claim", "abstract-visibility-claim"]
    );
  }

  const concreteSamples = {
    de: "Die rote Linie ist im Diagramm sichtbar.",
    en: "The red line is visible in the graph.",
    id: "Garis merah terlihat pada grafik.",
  };

  for (const [locale, source] of Object.entries(concreteSamples)) {
    assert.deepEqual(findLessonVoiceIssues(locale, source), []);
  }
});

it("rejects formulaic observation filler", () => {
  const samples = {
    de: "Wir können sehen, dass die Werte steigen.",
    en: "We can see that the values increase.",
    id: "Kita dapat melihat bahwa nilainya meningkat.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["formulaic-observation-filler"]
    );
  }
});

it("rejects passive observation filler", () => {
  const samples = {
    de: "Man erkennt, dass die beiden Werte verschieden sind.",
    en: "It can be seen that the two values differ.",
    id: "Terlihat bahwa kedua nilai berbeda.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["formulaic-observation-filler"]
    );
  }
});

it("rejects generic observed openers but preserves an observation condition", () => {
  const samples = {
    de: "Bei genauerer Betrachtung, steigt die Folge jeweils um zwei.",
    en: "When observed, the sequence increases by two each time.",
    id: "Jika diamati, barisan bertambah dua pada setiap langkah.",
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
      "Ketika diamati dengan mikroskop, bakteri berbentuk batang terlihat pada bidang pandang."
    ),
    []
  );
});

it("rejects stock visual handoffs and preserves named graph evidence", () => {
  const samples = {
    de: "Wenn wir die Funktion visualisieren, sieht sie so aus.",
    en: "If we visualize the function, it will look like this.",
    id: "Jika kita visualisasikan fungsinya, akan terlihat seperti ini.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["formulaic-visual-handoff"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Grafik menunjukkan fungsi awal dan dua hasil transformasi."
    ),
    []
  );
});
