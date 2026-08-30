import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Absolute certainty about the freezing point of salt solutions",
        },
        {
          isCorrect: false,
          label:
            "Why all evidence in the freezing point of salt solutions should be ignored",
        },
        {
          isCorrect: false,
          label: "The complete world history of solute",
        },
        {
          isCorrect: true,
          label:
            "Testing adding a measured mass of table salt in the freezing point of salt solutions",
        },
        {
          isCorrect: false,
          label: "One rule for every the freezing point of salt solutions",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
