import assert from "node:assert/strict";
import test from "node:test";

import { findLessonVoiceIssues } from "#nakafa-content/voice-scan";

test("rejects peta as a calque for a transformation image", () => {
  const source = [
    "Tentukan peta dari titik A setelah rotasi.",
    "Petanya adalah titik B.",
    "Peta: B(2,3).",
    "Hitung peta titik P oleh rotasi.",
    "Jadi, peta titiknya adalah B.",
  ].join("\n");

  assert.deepEqual(
    findLessonVoiceIssues("id", source).map(({ rule }) => rule),
    [
      "indonesian-transformation-image-calque",
      "indonesian-transformation-image-calque",
      "indonesian-transformation-image-calque",
      "indonesian-transformation-image-calque",
      "indonesian-transformation-image-calque",
    ]
  );

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Peta Indonesia menunjukkan batas provinsi. Fungsi f memetakan A ke B."
    ),
    []
  );
});
test("rejects narrow Indonesian technical calques", () => {
  const source = [
    "Python memakai pembagian lantai untuk membulatkan hasil ke bawah.",
    "Dalam analisis dimensi, satuan yang sama saling habis.",
    "<ConstantCompositionLab title={<>Gerbang Rasio Air</>} />",
    "Array adalah wadah n-dimensi untuk data.",
  ].join("\n");

  assert.deepEqual(
    findLessonVoiceIssues("id", source).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [
      { line: 1, rule: "indonesian-floor-division-calque" },
      { line: 2, rule: "indonesian-unit-cancellation-calque" },
      { line: 3, rule: "indonesian-water-ratio-gateway" },
      { line: 4, rule: "indonesian-dimensional-container-calque" },
    ]
  );
});
test("rejects an unexplained regularization calque without banning the subject terms", () => {
  const source = [
    "Arah dengan nilai singular kecil disusutkan agar tidak memperbesar derau.",
    "Komponen solusi tersebut hampir tidak disusutkan.",
  ].join("\n");

  assert.deepEqual(
    findLessonVoiceIssues("id", source).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [
      { line: 1, rule: "indonesian-unexplained-regularization-calque" },
      { line: 2, rule: "indonesian-unexplained-regularization-calque" },
    ]
  );

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Derau putih adalah proses acak dengan rapat spektral daya yang konstan. Es menyusut ketika suhunya naik. Faktor filter yang mendekati nol membuat komponen solusi menjadi lebih kecil."
    ),
    []
  );
});
test("rejects mechanical input and constraint calques in Indonesian", () => {
  const source = [
    "Kedua komposisi mengembalikan masukan x.",
    "Terjemahkan kendala keliling.",
  ].join("\n");

  assert.deepEqual(
    findLessonVoiceIssues("id", source).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [
      { line: 1, rule: "indonesian-mechanical-input-constraint-calque" },
      { line: 2, rule: "indonesian-mechanical-input-constraint-calque" },
    ]
  );

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Fungsi identitas mengembalikan masukan tanpa perubahan. Kendala optimisasi ini membatasi nilai x. Ubah kendala keliling menjadi persamaan agar panjang dapat ditulis dengan satu variabel. Terjemahkan kendala ke bahasa Inggris."
    ),
    []
  );
});
test("preserves literal floors containers and gates", () => {
  const source = [
    "Petugas membersihkan lantai laboratorium setelah praktikum.",
    "Tiga satuan obat habis terjual sebelum siang.",
    "Gerbang air dibuka setelah ketinggian waduk mencapai batas aman.",
    "Wadah plastik ini menampung sampel air.",
    "Faktor satuan yang sama pada pembilang dan penyebut dapat dicoret.",
    'Array dapat memiliki <InlineMath math="n" /> dimensi.',
    "<Card title={<CodeBlock>Gerbang Rasio Air</CodeBlock>} />",
  ].join("\n");

  assert.deepEqual(findLessonVoiceIssues("id", source), []);
});
test("rejects an empty claim that a term is important", () => {
  assert.deepEqual(
    findLessonVoiceIssues("id", 'Kata "maksimum" penting.').map(
      ({ rule }) => rule
    ),
    ["empty-important-term-label"]
  );

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Istilah maksimum menyatakan batas kapasitas, bukan urutan pengisian."
    ),
    []
  );
});
