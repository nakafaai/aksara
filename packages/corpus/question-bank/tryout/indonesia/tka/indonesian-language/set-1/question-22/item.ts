import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "language-suitability",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Masukkan Apa Saja",
        },
        {
          isCorrect: false,
          label: "Tempat Barang yang Tidak Disukai",
        },
        {
          isCorrect: false,
          label: "Mungkin Bisa Menjadi Kompos",
        },
        {
          isCorrect: false,
          label: "Wadah Hijau yang Bagus",
        },
        {
          isCorrect: true,
          label: "Sisa Nabati Bersih Tanpa Kemasan",
        },
      ],
    },
  },
  stimulusKey: "food-scraps",
};

export default item;
