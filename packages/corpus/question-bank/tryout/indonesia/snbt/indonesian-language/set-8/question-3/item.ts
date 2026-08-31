import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Karena kondisi perubahan menghasilkan 3, sedangkan nilai awal 7 dan pembanding 8, lapisan tipis petroleum jelly pada permukaan bawah daun telah terisolasi sebagai satu-satunya penyebab selama jenis daun, lama pengamatan, dan luas permukaan awal dibuat sama.",
        },
        {
          isCorrect: false,
          label:
            "Pengulangan paling informatif sebaiknya mengubah jenis daun, lama pengamatan, dan luas permukaan awal bersamaan dengan lapisan tipis petroleum jelly pada permukaan bawah daun agar gabungan kondisi yang lebih realistis dapat diuji.",
        },
        {
          isCorrect: true,
          label:
            "Pada kondisi yang diuji, lapisan tipis petroleum jelly pada permukaan bawah daun berkaitan dengan perubahan dari 7 dan 8 menjadi 3; karena daun yang dipetik tidak sepenuhnya mewakili kondisi tumbuhan utuh, pola itu perlu diuji lagi sebelum diperluas menjadi klaim umum.",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bahwa daun yang dipetik tidak sepenuhnya mewakili kondisi tumbuhan utuh memengaruhi ketelitian angka, tetapi tidak memengaruhi luas penerapan temuan tentang kehilangan massa pada daun.",
        },
        {
          isCorrect: false,
          label:
            "Pengulangan dengan lebih banyak unit dapat mempersempit ketidakpastian, tetapi tidak mungkin mengubah penafsiran awal tentang kehilangan massa pada daun.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
