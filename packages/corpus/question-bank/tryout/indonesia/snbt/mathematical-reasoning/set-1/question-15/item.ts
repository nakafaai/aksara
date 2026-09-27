import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-23
const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$40$$",
        },
        {
          isCorrect: false,
          label: "$$60$$",
        },
        {
          isCorrect: false,
          label: "$$80$$",
        },
        {
          isCorrect: false,
          label: "$$100$$",
        },
        {
          isCorrect: true,
          label: "$$20$$",
        },
      ],
    },
  },
};

export default item;
