import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Absolute certainty about the school media room",
        },
        {
          isCorrect: false,
          label: "Why all evidence in the school media room should be ignored",
        },
        {
          isCorrect: false,
          label: "The complete world history of self-efficacy",
        },
        {
          isCorrect: true,
          label: "Leah's next step in the school media room",
        },
        {
          isCorrect: false,
          label: "One rule for every the school media room",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
