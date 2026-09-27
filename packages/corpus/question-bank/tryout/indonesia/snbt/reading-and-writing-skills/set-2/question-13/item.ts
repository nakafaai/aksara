import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "meskipun.",
        },
        {
          isCorrect: false,
          label: "agar.",
        },
        {
          isCorrect: false,
          label: "kecuali.",
        },
        {
          isCorrect: true,
          label: "karena.",
        },
        {
          isCorrect: false,
          label: "setelah.",
        },
      ],
    },
  },
};

export default item;
