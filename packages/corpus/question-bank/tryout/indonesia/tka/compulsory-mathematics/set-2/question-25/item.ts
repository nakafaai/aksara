import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "probability",
  },
  responses: {
    id: {
      categories: ["Benar", "Salah"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "Peluang jumlah kedua angka ganjil adalah $$\\frac47$$.",
        },
        {
          correctCategoryOrder: 1,
          label: "Peluang kedua kartu bernomor prima adalah $$\\frac3{14}$$.",
        },
        {
          correctCategoryOrder: 1,
          label:
            "Jika kartu pertama genap, peluang kartu kedua ganjil adalah $$\\frac47$$.",
        },
        {
          correctCategoryOrder: 2,
          label:
            "Kejadian kartu pertama genap dan kartu kedua ganjil saling bebas.",
        },
        {
          correctCategoryOrder: 1,
          label:
            "Peluang angka yang lebih besar adalah $$8$$ sebesar $$\\frac14$$.",
        },
      ],
    },
  },
};

export default item;
