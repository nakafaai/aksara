import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "classification",
  },
  responses: {
    en: {
      categories: ["Plant support", "Water care", "Record keeping"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "Bamboo frames tied to heavy planters",
        },
        {
          correctCategoryOrder: 2,
          label: "Mesh covers on the containers",
        },
        {
          correctCategoryOrder: 3,
          label: "A notebook in a sealed box",
        },
      ],
    },
  },
  stimulusKey: "rooftop-garden",
};

export default item;
