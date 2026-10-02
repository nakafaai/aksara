import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "jarang.",
        },
        {
          isCorrect: true,
          label: "sering.",
        },
        {
          isCorrect: false,
          label: "tiba-tiba.",
        },
        {
          isCorrect: false,
          label: "terpisah.",
        },
        {
          isCorrect: false,
          label: "mungkin.",
        },
      ],
    },
  },
};

export default item;
