import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan hanya mencatat sejarah lengkap jalur wisata hutan kota tanpa membahas keputusan atau bukti.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan membuktikan bahwa satu cara pasti berhasil dalam setiap jalur wisata hutan kota.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menolak seluruh pengukuran dan hanya mengandalkan kesan pribadi.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan terutama menjelaskan definisi aksesibilitas tanpa menghubungkannya dengan konteks.",
        },
        {
          isCorrect: true,
          label:
            "Pengelola jalur wisata hutan kota menilai tanda jarak menuju titik keluar melalui data pembanding dan masukan pihak terdampak.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
