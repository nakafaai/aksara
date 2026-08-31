import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The class tested how adding a measured mass of table salt affected a solution's freezing point, while controlling other factors and reporting a limitation.",
        },
        {
          isCorrect: false,
          label:
            "The class tested how adding a measured mass of table salt affected a solution's freezing point, while controlling the listed factors but treating one short trial as proof of a universal effect.",
        },
        {
          isCorrect: false,
          label:
            "The class tested how adding a measured mass of table salt affected a solution's freezing point, while reporting the limitation but leaving the comparison conditions out of the interpretation.",
        },
        {
          isCorrect: false,
          label:
            "The class tested how adding a measured mass of table salt affected a solution's freezing point, while treating the scientific term as the measured outcome that settles the investigation.",
        },
        {
          isCorrect: false,
          label:
            "The class tested how adding a measured mass of table salt affected a solution's freezing point, while using the comparison only to confirm the initial hypothesis and excluding the remaining uncertainty.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
