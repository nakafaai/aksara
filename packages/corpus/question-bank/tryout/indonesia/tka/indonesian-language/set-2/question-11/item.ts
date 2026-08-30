import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  responses: {
    id: {
      categories: ["Sudah dicatat", "Akan dicatat"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "Lama genangan",
        },
        {
          correctCategoryOrder: 2,
          label: "Intensitas hujan",
        },
        {
          correctCategoryOrder: 2,
          label: "Kelembapan tanah sebelum hujan",
        },
      ],
    },
  },
  stimulusKey: "rain-garden",
};

export default item;
