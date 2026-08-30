import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Testing adding a removable mesh with smaller openings in a model filter for floating plastic fragments",
        },
        {
          isCorrect: false,
          label:
            "Absolute certainty about a model filter for floating plastic fragments",
        },
        {
          isCorrect: false,
          label:
            "Why all evidence in a model filter for floating plastic fragments should be ignored",
        },
        {
          isCorrect: false,
          label: "The complete world history of selectivity",
        },
        {
          isCorrect: false,
          label:
            "One rule for every a model filter for floating plastic fragments",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
