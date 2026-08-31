import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Karena kondisi perubahan menghasilkan 23, sedangkan nilai awal 14 dan pembanding 15, air bersuhu 35 derajat Celsius telah terisolasi sebagai satu-satunya penyebab selama massa ragi, jumlah gula, dan ukuran botol dibuat sama.",
        },
        {
          isCorrect: false,
          label:
            "Pengulangan paling informatif sebaiknya mengubah massa ragi, jumlah gula, dan ukuran botol bersamaan dengan air bersuhu 35 derajat Celsius agar gabungan kondisi yang lebih realistis dapat diuji.",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bahwa volume balon hanya menjadi perkiraan kasar jumlah gas memengaruhi ketelitian angka, tetapi tidak memengaruhi luas penerapan temuan tentang produksi gas pada campuran ragi.",
        },
        {
          isCorrect: true,
          label:
            "Pada kondisi yang diuji, air bersuhu 35 derajat Celsius berkaitan dengan perubahan dari 14 dan 15 menjadi 23; karena volume balon hanya menjadi perkiraan kasar jumlah gas, pola itu perlu diuji lagi sebelum diperluas menjadi klaim umum.",
        },
        {
          isCorrect: false,
          label:
            "Pengulangan dengan lebih banyak unit dapat mempersempit ketidakpastian, tetapi tidak mungkin mengubah penafsiran awal tentang produksi gas pada campuran ragi.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
