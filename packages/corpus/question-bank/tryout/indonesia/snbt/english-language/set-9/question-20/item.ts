import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Absolute certainty about a night market after closing",
        },
        {
          isCorrect: false,
          label:
            "Why all evidence in a night market after closing should be ignored",
        },
        {
          isCorrect: false,
          label: "The complete world history of plot structure",
        },
        {
          isCorrect: true,
          label: "A green permit card in a night market after closing",
        },
        {
          isCorrect: false,
          label: "One rule for every a night market after closing",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
