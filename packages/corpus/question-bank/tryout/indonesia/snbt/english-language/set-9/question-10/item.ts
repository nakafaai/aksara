import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Absolute certainty about a night-market waste station",
        },
        {
          isCorrect: false,
          label:
            "Why all evidence in a night-market waste station should be ignored",
        },
        {
          isCorrect: false,
          label: "The complete world history of system alignment",
        },
        {
          isCorrect: true,
          label: "Evidence-informed change in a night-market waste station",
        },
        {
          isCorrect: false,
          label: "One rule for every a night-market waste station",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
