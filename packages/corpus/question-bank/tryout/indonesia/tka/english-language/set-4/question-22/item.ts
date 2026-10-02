import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "analytical-exposition",
    topic: "information-validity",
  },
  responses: {
    en: {
      categories: ["Supported", "Not supported"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 2,
          label:
            "The trees lowered the air temperature across the town center.",
        },
        {
          correctCategoryOrder: 2,
          label:
            "Asphalt in the sun is hotter than grass in the sun at every hour of the day.",
        },
        {
          correctCategoryOrder: 1,
          label:
            "On the day of the test, concrete in full sun was hotter than grass in full sun.",
        },
      ],
    },
  },
  stimulusKey: "shade-trees",
};

export default item;
