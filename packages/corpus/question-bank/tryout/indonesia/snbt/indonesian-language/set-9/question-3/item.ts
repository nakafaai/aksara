import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Pada kondisi yang diuji, lapisan gabus setebal dua sentimeter berkaitan dengan perubahan dari 74 dan 72 menjadi 61; karena ruang kelas tidak memiliki kondisi akustik yang sama dengan bangunan nyata, pola itu perlu diuji lagi sebelum diperluas menjadi klaim umum.",
        },
        {
          isCorrect: false,
          label:
            "Karena kondisi perubahan menghasilkan 61, sedangkan nilai awal 74 dan pembanding 72, lapisan gabus setebal dua sentimeter telah terisolasi sebagai satu-satunya penyebab selama jarak sumber suara, volume awal, dan posisi alat ukur dibuat sama.",
        },
        {
          isCorrect: false,
          label:
            "Pengulangan paling informatif sebaiknya mengubah jarak sumber suara, volume awal, dan posisi alat ukur bersamaan dengan lapisan gabus setebal dua sentimeter agar gabungan kondisi yang lebih realistis dapat diuji.",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bahwa ruang kelas tidak memiliki kondisi akustik yang sama dengan bangunan nyata memengaruhi ketelitian angka, tetapi tidak memengaruhi luas penerapan temuan tentang peredaman bunyi dalam kotak model.",
        },
        {
          isCorrect: false,
          label:
            "Pengulangan dengan lebih banyak unit dapat mempersempit ketidakpastian, tetapi tidak mungkin mengubah penafsiran awal tentang peredaman bunyi dalam kotak model.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
