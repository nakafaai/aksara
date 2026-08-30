import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan hanya mencatat sejarah lengkap rangkaian listrik dengan dua lampu tanpa membahas keputusan atau bukti.",
        },
        {
          isCorrect: true,
          label:
            "Rangkaian listrik dengan dua lampu menyederhanakan proses agar dapat diperiksa sambil tetap memiliki batas representasi.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan membuktikan bahwa satu cara pasti berhasil dalam setiap rangkaian listrik dengan dua lampu.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menolak seluruh pengukuran dan hanya mengandalkan kesan pribadi.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan terutama menjelaskan definisi rangkaian tertutup tanpa menghubungkannya dengan konteks.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
