import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan hanya mencatat sejarah lengkap kehilangan massa pada daun tanpa membahas keputusan atau bukti.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan membuktikan bahwa satu cara pasti berhasil dalam setiap kehilangan massa pada daun.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menolak seluruh pengukuran dan hanya mengandalkan kesan pribadi.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan terutama menjelaskan definisi transpirasi tanpa menghubungkannya dengan konteks.",
        },
        {
          isCorrect: true,
          label:
            "Simulasi membandingkan lapisan tipis petroleum jelly pada permukaan bawah daun dalam kehilangan massa pada daun sambil menjaga faktor lain dan mengakui batasan pengukuran.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
