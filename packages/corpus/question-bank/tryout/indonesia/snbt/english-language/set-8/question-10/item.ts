import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Absolute certainty about a multilingual youth translation club",
        },
        {
          isCorrect: false,
          label:
            "Why all evidence in a multilingual youth translation club should be ignored",
        },
        {
          isCorrect: false,
          label: "The complete world history of register",
        },
        {
          isCorrect: false,
          label: "One rule for every a multilingual youth translation club",
        },
        {
          isCorrect: true,
          label:
            "Evidence-informed change in a multilingual youth translation club",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
