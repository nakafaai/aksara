import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "loanwords",
  },
  responses: {
    id: {
      categories: ["Boleh", "Tidak boleh"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "Potongan sayur",
        },
        {
          correctCategoryOrder: 2,
          label: "Kuah berminyak",
        },
        {
          correctCategoryOrder: 1,
          label: "Daun kering",
        },
      ],
    },
  },
  stimulusKey: "food-scraps",
};

export default item;
