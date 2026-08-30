import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Theo's next step in a small public archive",
        },
        {
          isCorrect: false,
          label: "Absolute certainty about a small public archive",
        },
        {
          isCorrect: false,
          label: "Why all evidence in a small public archive should be ignored",
        },
        {
          isCorrect: false,
          label: "The complete world history of metadata",
        },
        {
          isCorrect: false,
          label: "One rule for every a small public archive",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
