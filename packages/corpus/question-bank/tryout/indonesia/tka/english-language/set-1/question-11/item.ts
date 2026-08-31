import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "explicit-information",
  },
  responses: {
    en: {
      categories: ["Before it was found", "After it was found"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "Mina blamed Arif.",
        },
        {
          correctCategoryOrder: 2,
          label: "The pages were placed between clean sheets.",
        },
        {
          correctCategoryOrder: 2,
          label: "A shared digital copy was created.",
        },
      ],
    },
  },
  stimulusKey: "weather-notebook",
};

export default item;
