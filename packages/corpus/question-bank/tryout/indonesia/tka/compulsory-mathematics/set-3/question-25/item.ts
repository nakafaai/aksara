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
          label: "Peluang jumlah kedua dadu $$9$$ adalah $$\\frac19$$.",
        },
        {
          correctCategoryOrder: 1,
          label: "Peluang dadu merah lebih besar adalah $$\\frac5{12}$$.",
        },
        {
          correctCategoryOrder: 1,
          label:
            "Jika jumlahnya genap, peluang kedua dadu menunjukkan angka ganjil adalah $$\\frac12$$.",
        },
        {
          correctCategoryOrder: 1,
          label:
            "Kejadian dadu merah genap dan jumlah kedua dadu genap saling bebas.",
        },
        {
          correctCategoryOrder: 2,
          label:
            "Peluang sedikitnya satu dadu menunjukkan angka enam adalah $$\\frac13$$.",
        },
      ],
    },
  },
};

export default item;
