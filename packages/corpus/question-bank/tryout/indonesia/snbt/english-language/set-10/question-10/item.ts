import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Absolute certainty about a youth event-planning group",
        },
        {
          isCorrect: false,
          label:
            "Why all evidence in a youth event-planning group should be ignored",
        },
        {
          isCorrect: false,
          label: "The complete world history of fixed cost",
        },
        {
          isCorrect: true,
          label: "Evidence-informed change in a youth event-planning group",
        },
        {
          isCorrect: false,
          label: "One rule for every a youth event-planning group",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
