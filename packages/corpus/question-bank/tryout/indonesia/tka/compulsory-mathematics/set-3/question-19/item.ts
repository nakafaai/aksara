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
          label: "Keliling alas dikalikan $$3$$.",
        },
        {
          correctCategoryOrder: 1,
          label: "Luas alas dikalikan $$9$$.",
        },
        {
          correctCategoryOrder: 1,
          label: "Volume dikalikan $$\\frac92$$.",
        },
        {
          correctCategoryOrder: 2,
          label: "Garis pelukis selalu dikalikan $$\\frac32$$.",
        },
        {
          correctCategoryOrder: 2,
          label: "Luas selimut selalu dikalikan $$\\frac92$$.",
        },
      ],
    },
  },
};

export default item;
