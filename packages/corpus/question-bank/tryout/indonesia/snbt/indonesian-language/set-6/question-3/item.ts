import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Karena tali 60 sentimeter menghasilkan 15,6 detik dan kedua pengukuran tali 100 sentimeter sekitar 20 detik, data telah menentukan rumus periode untuk setiap panjang tali.",
        },
        {
          isCorrect: false,
          label:
            "Pengulangan paling informatif sebaiknya mengubah massa, sudut awal, cara pelepasan, dan panjang tali secara bersamaan agar keadaan yang lebih beragam langsung terwakili.",
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
            "Kemiripan dua hasil tali 100 sentimeter dan waktu yang lebih singkat pada tali 60 sentimeter mendukung hubungan panjang dengan periode, tetapi panjang tambahan dan pencatat otomatis diperlukan untuk menentukan bentuk hubungannya.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
