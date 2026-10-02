import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "menyaingi.",
        },
        {
          isCorrect: false,
          label: "menirukan.",
        },
        {
          isCorrect: false,
          label: "mengikuti.",
        },
        {
          isCorrect: true,
          label: "mirip dengan.",
        },
        {
          isCorrect: false,
          label: "menggantikan.",
        },
      ],
    },
  },
};

export default item;
