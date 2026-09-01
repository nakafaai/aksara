import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "explicit-information",
  },
  responses: {
    en: {
      categories: ["Outcome to measure", "Potential unequal effect"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "Late arrivals",
        },
        {
          correctCategoryOrder: 1,
          label: "Transport delays",
        },
        {
          correctCategoryOrder: 2,
          label: "Difficulty collecting a younger sibling",
        },
      ],
    },
  },
  stimulusKey: "later-start",
};

export default item;
