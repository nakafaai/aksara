import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Karena kondisi perubahan menghasilkan 16, sedangkan nilai awal 20 dan pembanding 21, tali sepanjang 60 sentimeter telah terisolasi sebagai satu-satunya penyebab selama massa beban, sudut awal, dan cara melepas bandul dibuat sama.",
        },
        {
          isCorrect: false,
          label:
            "Pengulangan paling informatif sebaiknya mengubah massa beban, sudut awal, dan cara melepas bandul bersamaan dengan tali sepanjang 60 sentimeter agar gabungan kondisi yang lebih realistis dapat diuji.",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bahwa pengukuran manual masih dapat dipengaruhi waktu reaksi pencatat memengaruhi ketelitian angka, tetapi tidak memengaruhi luas penerapan temuan tentang periode ayunan bandul.",
        },
        {
          isCorrect: false,
          label:
            "Pengulangan dengan lebih banyak unit dapat mempersempit ketidakpastian, tetapi tidak mungkin mengubah penafsiran awal tentang periode ayunan bandul.",
        },
        {
          isCorrect: true,
          label:
            "Pada kondisi yang diuji, tali sepanjang 60 sentimeter berkaitan dengan perubahan dari 20 dan 21 menjadi 16; karena pengukuran manual masih dapat dipengaruhi waktu reaksi pencatat, pola itu perlu diuji lagi sebelum diperluas menjadi klaim umum.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
