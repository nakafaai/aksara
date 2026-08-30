import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Absolute certainty about a local history display",
        },
        {
          isCorrect: false,
          label:
            "Why all evidence in a local history display should be ignored",
        },
        {
          isCorrect: false,
          label: "The complete world history of plain language",
        },
        {
          isCorrect: false,
          label: "One rule for every a local history display",
        },
        {
          isCorrect: true,
          label: "Evidence-informed change in a local history display",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
