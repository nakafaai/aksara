import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Karena kondisi perubahan menghasilkan 68, sedangkan nilai awal 46 dan pembanding 44, susunan kerikil, pasir, dan arang dengan ketebalan sama telah terisolasi sebagai satu-satunya penyebab selama volume awal, jenis wadah, dan lama pengendapan dibuat sama.",
        },
        {
          isCorrect: false,
          label:
            "Pengulangan paling informatif sebaiknya mengubah volume awal, jenis wadah, dan lama pengendapan bersamaan dengan susunan kerikil, pasir, dan arang dengan ketebalan sama agar gabungan kondisi yang lebih realistis dapat diuji.",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bahwa kejernihan visual tidak membuktikan bahwa air aman diminum memengaruhi ketelitian angka, tetapi tidak memengaruhi luas penerapan temuan tentang model penyaringan air keruh.",
        },
        {
          isCorrect: true,
          label:
            "Pada kondisi yang diuji, susunan kerikil, pasir, dan arang dengan ketebalan sama berkaitan dengan perubahan dari 46 dan 44 menjadi 68; karena kejernihan visual tidak membuktikan bahwa air aman diminum, pola itu perlu diuji lagi sebelum diperluas menjadi klaim umum.",
        },
        {
          isCorrect: false,
          label:
            "Pengulangan dengan lebih banyak unit dapat mempersempit ketidakpastian, tetapi tidak mungkin mengubah penafsiran awal tentang model penyaringan air keruh.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
