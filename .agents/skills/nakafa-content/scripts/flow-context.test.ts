import assert from "node:assert/strict";
import test from "node:test";

import { findLessonVoiceIssues } from "#nakafa-content/voice-scan";

test("rejects invented learning settings without banning real class meanings", () => {
  const failures = {
    de: "Diese Unterrichtsrechnung berechnet den Anhalteweg.",
    en: "This classroom calculation estimates the stopping distance.",
    id: "Perhitungan kelas ini memperkirakan jarak henti.",
  };
  const directExplanations = {
    de: "Dieses vereinfachte Modell berechnet den Anhalteweg.",
    en: "This simplified model calculates the stopping distance.",
    id: "Model sederhana ini menghitung jarak henti.",
  };

  for (const locale of ["de", "en", "id"] as const) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, failures[locale]).map(({ rule }) => rule),
      ["invented-learning-setting"]
    );
    assert.deepEqual(
      findLessonVoiceIssues(locale, directExplanations[locale]),
      []
    );
  }

  const courseAnchors = {
    de: "Diese Lektion verwendet drei Rechenwege.",
    en: "This lesson uses three calculation methods.",
    id: "Materi ini memakai tiga cara hitung.",
  };

  for (const locale of ["de", "en", "id"] as const) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, courseAnchors[locale]).map(
        ({ rule }) => rule
      ),
      ["invented-learning-setting"]
    );
  }

  const legitimateMeanings = {
    de: "Eine Studie vergleicht ein Unterrichtsmodell mit direkter Erklärung.",
    en: "The study compares a classroom model with direct instruction.",
    id: "Penelitian ini membandingkan model pembelajaran ini dengan metode ceramah.",
  };

  for (const locale of ["de", "en", "id"] as const) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, legitimateMeanings[locale]),
      []
    );
  }
});

test("rejects curriculum narration but preserves curriculum as the subject", () => {
  const failures = {
    de: "Diese Begriffe werden in manchen Lehrplänen verwendet.",
    en: "These terms are used in some curricula.",
    id: "Istilah ini digunakan dalam sebagian kurikulum.",
  };
  const directExplanations = {
    de: "Eine breite Matrix kann auch horizontale Matrix heißen.",
    en: "A wide matrix may also be called a horizontal matrix.",
    id: "Matriks lebar juga dapat disebut matriks datar.",
  };

  for (const locale of ["de", "en", "id"] as const) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, failures[locale]).map(({ rule }) => rule),
      ["curriculum-narrator"]
    );
    assert.deepEqual(
      findLessonVoiceIssues(locale, directExplanations[locale]),
      []
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Penelitian ini membandingkan dua kurikulum matematika."
    ),
    []
  );
  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Istilah ini digunakan dalam beberapa kurikulum untuk menandai kompetensi yang sama."
    ).map(({ rule }) => rule),
    ["curriculum-narrator"]
  );
});

test("rejects a bare Indonesian range ending but preserves explicit ranges", () => {
  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "CIAAW melaporkan bobot atom standar beberapa unsur sebagai rentang."
    ).map(({ rule }) => rule),
    ["indonesian-trailing-bare-range"]
  );
  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "CIAAW melaporkan bobot atom standar beberapa unsur dalam bentuk rentang nilai."
    ),
    []
  );
  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Suhu berada dalam rentang 20 sampai 30 derajat Celsius."
    ),
    []
  );
});

test("rejects the aturan rambatan calque but preserves literal propagation", () => {
  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Hitung ketidakpastian hasil dengan aturan rambatan yang sesuai."
    ).map(({ rule }) => rule),
    ["indonesian-uncertainty-propagation-calque"]
  );
  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Untuk perkalian, hitung ketidakpastian hasil dari ketidakpastian setiap data ukur."
    ),
    []
  );
  assert.deepEqual(
    findLessonVoiceIssues("id", "Simbol c menyatakan cepat rambat cahaya."),
    []
  );
  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Aturan rambatan gelombang berubah pada batas dua medium."
    ),
    []
  );
});

test("rejects detached Indonesian discussion passives", () => {
  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Aturan ini tetap konsisten ketika hasil kali nol ikut dibahas."
    ).map(({ rule }) => rule),
    ["indonesian-detached-discussion-passive"]
  );
  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Aturan ini tetap berlaku ketika P atau Q adalah polinomial nol."
    ),
    []
  );
  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Topik keselamatan dibahas pada bagian berikutnya."
    ),
    []
  );
});

test("rejects Indonesian editorial classification in place of the subject relationship", () => {
  const failures = [
    "Virus yang merusak jaringan dibahas sebagai penyebab penyakit.",
    "Virus yang memengaruhi mikroba dibahas dalam konteks ekologi.",
  ];

  for (const source of failures) {
    assert.deepEqual(
      findLessonVoiceIssues("id", source).map(({ rule }) => rule),
      ["indonesian-meta-discussion-classification"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Virus yang merusak jaringan menyebabkan penyakit, sedangkan virus yang mengubah populasi mikroba memengaruhi ekosistem."
    ),
    []
  );
  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Topik keselamatan dibahas pada bagian berikutnya."
    ),
    []
  );
});
