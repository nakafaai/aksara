import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "explicit-information",
  },
  responses: {
    en: {
      categories: ["Planned", "Live", "Direct"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "The printed timetable",
        },
        {
          correctCategoryOrder: 2,
          label: "The official service page",
        },
        {
          correctCategoryOrder: 3,
          label: "The clinic receptionist",
        },
      ],
    },
  },
  stimulusKey: "last-bus",
};

export default item;
