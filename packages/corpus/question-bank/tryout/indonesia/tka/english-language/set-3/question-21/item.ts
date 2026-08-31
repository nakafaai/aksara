import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "explicit-information",
  },
  responses: {
    en: {
      categories: ["Repair benefit", "Replacement reason"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label:
            "A worn wheel can be changed without replacing the whole device.",
        },
        {
          correctCategoryOrder: 2,
          label: "An unapproved battery would be required.",
        },
        {
          correctCategoryOrder: 2,
          label: "Old equipment no longer meets accessibility needs.",
        },
      ],
    },
  },
  stimulusKey: "repair-first",
};

export default item;
