import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "classification",
  },
  responses: {
    en: {
      categories: ["Safe movement", "Product protection", "Drainage"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "Yellow-edged wooden bridges",
        },
        {
          correctCategoryOrder: 2,
          label: "Vertical racks beneath deep awnings",
        },
        {
          correctCategoryOrder: 3,
          label: "A blue circle kept clear of chairs",
        },
      ],
    },
  },
  stimulusKey: "rain-market",
};

export default item;
