import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "A rain-spotted message card in a neighbourhood flood drill",
        },
        {
          isCorrect: false,
          label: "Absolute certainty about a neighbourhood flood drill",
        },
        {
          isCorrect: false,
          label:
            "Why all evidence in a neighbourhood flood drill should be ignored",
        },
        {
          isCorrect: false,
          label: "The complete world history of narrative conflict",
        },
        {
          isCorrect: false,
          label: "One rule for every a neighbourhood flood drill",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
