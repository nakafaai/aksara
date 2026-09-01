import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "explicit-information",
  },
  responses: {
    en: {
      categories: ["Identifying", "Tracing", "Comparing"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "Writing the exact claim in one sentence",
        },
        {
          correctCategoryOrder: 2,
          label: "Finding the original report behind a screenshot",
        },
        {
          correctCategoryOrder: 3,
          label: "Checking another source with independent evidence",
        },
      ],
    },
  },
  stimulusKey: "source-checking",
};

export default item;
