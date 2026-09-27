import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Sebaliknya",
        },
        {
          isCorrect: false,
          label: "Oleh karena itu",
        },
        {
          isCorrect: true,
          label: "Selain itu",
        },
        {
          isCorrect: false,
          label: "Namun",
        },
        {
          isCorrect: false,
          label: "Misalnya",
        },
      ],
    },
  },
};

export default item;
