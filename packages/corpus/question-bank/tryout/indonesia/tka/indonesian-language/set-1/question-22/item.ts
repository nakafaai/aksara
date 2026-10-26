import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "language-suitability",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Masukkan Apa Saja",
        },
        {
          correct: false,
          label: "Tempat Barang yang Tidak Disukai",
        },
        {
          correct: false,
          label: "Mungkin Bisa Menjadi Kompos",
        },
        {
          correct: false,
          label: "Wadah Hijau yang Bagus",
        },
        {
          correct: true,
          label: "Sisa Nabati Bersih Tanpa Kemasan",
        },
      ],
    },
  },
  stimulus: "food-scraps",
};

export default item;
