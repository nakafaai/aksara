import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Absolute certainty about a quiet local museum",
        },
        {
          isCorrect: false,
          label: "Why all evidence in a quiet local museum should be ignored",
        },
        {
          isCorrect: true,
          label: "A blank caption card in a quiet local museum",
        },
        {
          isCorrect: false,
          label: "The complete world history of tone",
        },
        {
          isCorrect: false,
          label: "One rule for every a quiet local museum",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
