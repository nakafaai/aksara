import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "flaw",
  },
  stimulus: "posyandu",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Tabel ikut memuat bayi yang genap berusia $$12$$ bulan pada awal 2025, padahal bayi itu menjalani hampir seluruh jadwal imunisasi dasarnya pada 2024, sebelum SMS dikirim.",
        },
        {
          correct: false,
          label:
            "Usulan memakai SMS di seluruh kabupaten menganggap hambatan di kecamatan pegunungan sama dengan di Sindangjaya, yaitu orang tua lupa jadwal.",
        },
        {
          correct: false,
          label:
            "Jumlah bayi kedua kelompok berbeda, yaitu $$300$$ dan $$200$$, sehingga persentase cakupan kedua kelompok tidak dapat dibandingkan.",
        },
        {
          correct: false,
          label:
            "Survei tentang lupa jadwal dilakukan pada 2024, sebelum SMS ada, sehingga survei itu tidak dapat menunjukkan bahwa SMS bekerja.",
        },
        {
          correct: false,
          label:
            "Data hanya mencakup bayi yang genap berusia $$12$$ bulan, sehingga tidak menggambarkan imunisasi lanjutan pada usia balita.",
        },
      ],
    },
  },
};

export default item;
