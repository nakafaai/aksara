import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The songbird species",
        },
        { isCorrect: true, label: "The researchers" },
        {
          isCorrect: false,
          label: "The pathogen communities",
        },
        {
          isCorrect: false,
          label: "The Palaearctic regions",
        },
        {
          isCorrect: false,
          label: "The immune-recognition genes",
        },
      ],
    },
  },
};

export default item;
