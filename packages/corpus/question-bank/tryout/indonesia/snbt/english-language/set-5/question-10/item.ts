import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Absolute certainty about a community food pantry",
        },
        {
          isCorrect: true,
          label: "Evidence-informed change in a community food pantry",
        },
        {
          isCorrect: false,
          label:
            "Why all evidence in a community food pantry should be ignored",
        },
        {
          isCorrect: false,
          label: "The complete world history of stock rotation",
        },
        {
          isCorrect: false,
          label: "One rule for every a community food pantry",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
