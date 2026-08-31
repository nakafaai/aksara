import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Karena kondisi perubahan menghasilkan 63, sedangkan nilai awal 48 dan pembanding 50, reflektor pada sudut 45 derajat telah terisolasi sebagai satu-satunya penyebab selama volume air, warna wadah, dan lama pemanasan dibuat sama.",
        },
        {
          isCorrect: true,
          label:
            "Pada kondisi yang diuji, reflektor pada sudut 45 derajat berkaitan dengan perubahan dari 48 dan 50 menjadi 63; karena uji dilakukan pada satu rentang cuaca dan belum diulang pada musim berbeda, pola itu perlu diuji lagi sebelum diperluas menjadi klaim umum.",
        },
        {
          isCorrect: false,
          label:
            "Pengulangan paling informatif sebaiknya mengubah volume air, warna wadah, dan lama pemanasan bersamaan dengan reflektor pada sudut 45 derajat agar gabungan kondisi yang lebih realistis dapat diuji.",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bahwa uji dilakukan pada satu rentang cuaca dan belum diulang pada musim berbeda memengaruhi ketelitian angka, tetapi tidak memengaruhi luas penerapan temuan tentang pemanasan air dengan oven surya model.",
        },
        {
          isCorrect: false,
          label:
            "Pengulangan dengan lebih banyak unit dapat mempersempit ketidakpastian, tetapi tidak mungkin mengubah penafsiran awal tentang pemanasan air dengan oven surya model.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
