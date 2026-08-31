import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Papan baru berkaitan dengan peningkatan besar pada kelompok berpenglihatan rendah, tetapi cakupan peserta dan cara perekrutan belum mendukung klaim aksesibilitas bagi semua pengguna.",
        },
        {
          isCorrect: false,
          label:
            "Papan baru meningkatkan keberhasilan semua kelompok dengan besaran yang sama karena angka gabungan naik dari 46 menjadi 52 peserta.",
        },
        {
          isCorrect: false,
          label:
            "Papan baru sudah memenuhi definisi aksesibilitas karena peta raba dan panah timbul tersedia, terlepas dari siapa yang mengikuti uji.",
        },
        {
          isCorrect: false,
          label:
            "Hasil kelompok berpenglihatan biasa membuktikan papan baru tidak berguna sehingga peningkatan pada kelompok lain tidak perlu dipertimbangkan.",
        },
        {
          isCorrect: false,
          label:
            "Pemilihan urutan papan secara acak menghapus seluruh kemungkinan bias, termasuk bias karena pengunjung memilih sendiri untuk masuk ke jalur uji.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
