import { assert, it } from "@effect/vitest";

import { findLessonVoiceIssues } from "#nakafa-content/voice/scan";

it("rejects di mana as a relative connector but accepts location questions", () => {
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
it("rejects the stiff Indonesian membuat dapat construction", () => {
  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Standar ini membuat hasil dari tempat berbeda dapat dibandingkan."
    ).map(({ rule }) => rule),
    ["indonesian-causative-modal"]
  );
});
it("rejects common nonstandard Indonesian forms", () => {
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
it("rejects Indonesian slang in published lesson prose", () => {
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
it("rejects serampangan and preserves a concrete warning", () => {
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
it("allows standard Indonesian interpretation vocabulary in math and science", () => {
  for (const source of [
    "Tafsirkan gradien dalam konteks masalah.",
    "Interpretasikan hasil pengukuran ini.",
    "## Interpretasi Hasil",
    "Suhu reaksi dapat tinggi saat tekanan naik.",
  ]) {
    assert.deepEqual(findLessonVoiceIssues("id", source), []);
  }
});
it("preserves familiar English programming terms in Indonesian prose", () => {
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
it("rejects an unnamed calculation but preserves a named operation", () => {
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
it("rejects unnamed effects and purposes but preserves named mechanisms", () => {
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
it("rejects a bare visibility adverb with no observer or result", () => {
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

it("holds Malaysian Malay prose to the same rules", () => {
  const samples = {
    "empty-important-term-label": "Istilah **isotop** penting.",
    "indonesian-ambiguous-calculation-reference": "Semak pengiraannya.",
    "indonesian-attached-dimana": "Rumah dimana dia tinggal.",
    "indonesian-bare-visibility-adverb": "Gas itu bergerak tanpa kelihatan.",
    "indonesian-causative-modal": "Jadual ini membuat kita boleh mengira.",
    "indonesian-formal-filler": "Pada asasnya, kadar ialah nisbah.",
    "indonesian-informal-slang": "Jawapan takde unit.",
    "indonesian-nonstandard-apapun": "Pilih nilai apapun.",
    "indonesian-nonstandard-compound": "Murid seringkali lupa tanda.",
    "indonesian-relative-di-mana": "Kira luas, di mana panjangnya 5 cm.",
    "indonesian-stiff-serampangan": "Jangan pilih nilai sembarangan.",
    "indonesian-unnamed-effect-purpose-reference":
      "Kesannya boleh dirasai pada harga.",
    "unexplained-output-scheduling": "Loji ini menjadualkan output.",
    "unqualified-energy-density-claim":
      "Bateri ini boleh mempunyai ketumpatan tenaga tinggi.",
    "unqualified-fuel-storage-claim": "Bahan api boleh disimpan.",
    "vague-benefit-risk-reference": "Kelebihan itu tidak menghapuskan risiko.",
  };

  for (const [rule, source] of Object.entries(samples)) {
    assert.include(
      findLessonVoiceIssues("ms", source).map((issue) => issue.rule),
      rule
    );
  }
});

it("keeps a Malay menjadikan that a refusal or a comparison follows", () => {
  const sources = [
    "Nombor yang menjadikan penyebut sifar tidak boleh menjadi penyelesaian.",
    "Tempoh kajian tidak menjadikan kaedah itu lebih boleh dipercayai.",
  ];

  for (const source of sources) {
    assert.deepEqual(findLessonVoiceIssues("ms", source), []);
  }
});
