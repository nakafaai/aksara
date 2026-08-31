import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "classification",
  },
  responses: {
    en: {
      categories: ["Movement", "Moisture", "Access"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "Elastic shelf cords",
        },
        {
          correctCategoryOrder: 2,
          label: "Sealed book boxes",
        },
        {
          correctCategoryOrder: 3,
          label: "A folding ramp with raised edges",
        },
      ],
    },
  },
  stimulusKey: "library-boat",
};

export default item;
