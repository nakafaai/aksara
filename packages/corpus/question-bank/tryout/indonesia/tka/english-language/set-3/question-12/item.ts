import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "explicit-information",
  },
  responses: {
    en: {
      categories: ["Initial interpretation", "Later evidence"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "The packet should stay closed until 2040.",
        },
        {
          correctCategoryOrder: 2,
          label: "The code matched a twelve-year check.",
        },
        {
          correctCategoryOrder: 2,
          label: "2032 was one checkpoint in a series.",
        },
      ],
    },
  },
  stimulusKey: "future-seeds",
};

export default item;
