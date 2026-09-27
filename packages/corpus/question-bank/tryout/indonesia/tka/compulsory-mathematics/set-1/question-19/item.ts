import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  responses: {
    id: {
      categories: ["Benar", "Salah"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "Luas sisi $$pl$$ dikalikan $$6$$.",
        },
        {
          correctCategoryOrder: 1,
          label: "Luas sisi $$lt$$ dikalikan $$\\frac32$$.",
        },
        {
          correctCategoryOrder: 1,
          label: "Volume dikalikan $$3$$.",
        },
        {
          correctCategoryOrder: 2,
          label: "Setiap diagonal ruang dikalikan $$2$$.",
        },
        {
          correctCategoryOrder: 2,
          label: "Luas permukaan total selalu dikalikan $$3$$.",
        },
      ],
    },
  },
};

export default item;
