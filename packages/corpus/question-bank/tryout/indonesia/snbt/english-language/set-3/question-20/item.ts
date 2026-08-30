import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "A folded bus map in a station before sunrise",
        },
        {
          isCorrect: false,
          label: "Absolute certainty about a station before sunrise",
        },
        {
          isCorrect: false,
          label:
            "Why all evidence in a station before sunrise should be ignored",
        },
        {
          isCorrect: false,
          label: "The complete world history of irony",
        },
        {
          isCorrect: false,
          label: "One rule for every a station before sunrise",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
