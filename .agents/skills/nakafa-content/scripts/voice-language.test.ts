import assert from "node:assert/strict";
import test from "node:test";

import { findLessonVoiceIssues } from "#nakafa-content/voice-scan";

test("rejects di mana as a relative connector but accepts location questions", () => {
  const source = [
    "Fungsi ditulis sebagai x kuadrat, di mana x adalah input.",
    'di mana <InlineMath math="x" /> adalah input.',
    "Tanyakan di mana titik itu berada.",
    "Di mana titik itu berada?",
    "Jika kota A berada di sini, di mana letak kota B?",
  ].join("\n");

  assert.deepEqual(
    findLessonVoiceIssues("id", source).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [
      { line: 1, rule: "indonesian-relative-di-mana" },
      { line: 2, rule: "indonesian-relative-di-mana" },
    ]
  );
});
test("rejects the stiff Indonesian membuat dapat construction", () => {
  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Standar ini membuat hasil dari tempat berbeda dapat dibandingkan."
    ).map(({ rule }) => rule),
    ["indonesian-causative-modal"]
  );
});
test("rejects common nonstandard Indonesian forms", () => {
  const source = [
    "Data seringkali perlu dikonversi.",
    "Program mengkonversi teks menjadi angka.",
    "Kita mensubstitusi nilai ke persamaan.",
    "Kita mengkomposisikan dua fungsi.",
    "Operasi ini mentranspose matriks.",
  ].join("\n");

  assert.deepEqual(
    findLessonVoiceIssues("id", source).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [
      { line: 1, rule: "indonesian-nonstandard-compound" },
      { line: 2, rule: "indonesian-nonstandard-affix" },
      { line: 3, rule: "indonesian-nonstandard-affix" },
      { line: 4, rule: "indonesian-nonstandard-affix" },
      { line: 5, rule: "indonesian-nonstandard-affix" },
    ]
  );
});
test("rejects Indonesian slang in published lesson prose", () => {
  const source = [
    "Dua kejadian ini nggak bisa terjadi barengan.",
    "Aturannya sama kayak contoh sebelumnya.",
    "Program ini gak mengubah data asal.",
  ].join("\n");

  assert.deepEqual(
    findLessonVoiceIssues("id", source).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [
      { line: 1, rule: "indonesian-informal-slang" },
      { line: 2, rule: "indonesian-informal-slang" },
      { line: 3, rule: "indonesian-informal-slang" },
    ]
  );
});
test("rejects serampangan and preserves a concrete warning", () => {
  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Jangan membuat ulang rumus secara serampangan."
    ).map(({ rule }) => rule),
    ["indonesian-stiff-serampangan"]
  );

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Periksa fungsi yang tersedia sebelum menulis ulang rumus agar langkah yang sudah diuji tidak terlewat."
    ),
    []
  );
});
test("rejects stiff interpretation instructions but preserves technical context", () => {
  const failures = [
    "Tafsirkan solusi dalam konteks masalah.",
    "Interpretasikan solusi dalam konteks masalah.",
    "## Interpretasi Hasil",
    "| Nilai | Interpretasi |",
  ];

  for (const source of failures) {
    assert.deepEqual(
      findLessonVoiceIssues("id", source).map(({ rule }) => rule),
      ["indonesian-stiff-interpret-instruction"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Interpreter Python menjalankan kode. Penafsiran Rutherford diperiksa melalui eksperimen lain. Jelaskan arti solusi dalam masalah awal."
    ),
    []
  );
});
test("preserves familiar English programming terms in Indonesian prose", () => {
  const source = [
    "Statement pass tidak menjalankan tindakan.",
    "Setiap statement dalam blok memakai indentasi yang sama.",
    "Nested if memeriksa dua tingkat kondisi.",
    "For loop mengunjungi setiap elemen.",
    "Materi programming ini memakai namespace math.",
    "Nilai ditampilkan sebagai output.",
    "Special method memakai double underscore untuk truth testing.",
    "Container ini ordered dan mutable, sedangkan tuple immutable.",
    "Slicing dengan stride memilih sequence secara berkala.",
    "Nama fungsi dipakai tanpa prefix modul.",
  ].join("\n");

  assert.deepEqual(findLessonVoiceIssues("id", source), []);

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Token `class` adalah kata kunci untuk mendefinisikan kelas. Tipe `list` dapat diubah."
    ),
    []
  );
});
test("rejects an unnamed calculation but preserves a named operation", () => {
  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Periksa dulu fungsi yang tersedia sebelum menulis sendiri perhitungannya."
    ).map(({ rule }) => rule),
    ["indonesian-ambiguous-calculation-reference"]
  );

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Periksa dulu fungsi yang tersedia sebelum menulis sendiri rumus konversi satuan."
    ),
    []
  );
});
test("rejects unnamed effects and purposes but preserves named mechanisms", () => {
  const failures = [
    "Dampaknya dapat terasa pada arus dan badai.",
    "Nilai dampaknya melalui emisi daur hidup.",
    "Tujuannya adalah mendapatkan angka sekaligus memahami artinya.",
  ];

  for (const source of failures) {
    assert.deepEqual(
      findLessonVoiceIssues("id", source).map(({ rule }) => rule),
      ["indonesian-unnamed-effect-purpose-reference"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Perubahan suhu laut dapat mengubah arus dan memengaruhi pembentukan badai. Keberhasilan mitigasi diukur dari perubahan emisi bersih."
    ),
    []
  );
});
test("rejects a bare visibility adverb with no observer or result", () => {
  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Impor bintang dapat menimpa nama yang sudah ada tanpa terlihat, lalu mengubah hasil program."
    ).map(({ rule }) => rule),
    ["indonesian-bare-visibility-adverb"]
  );

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Jika nama itu sudah dipakai, nilai impor menggantikannya tanpa pesan galat."
    ),
    []
  );
  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Perubahan warna berlangsung tanpa terlihat dari permukaan."
    ),
    []
  );
});
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
