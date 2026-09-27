import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-23
const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$20$$",
        },
        {
          isCorrect: false,
          label: "$$21$$",
        },
        {
          isCorrect: false,
          label: "$$23$$",
        },
        {
          isCorrect: true,
          label: "$$22$$",
        },
        {
          isCorrect: false,
          label: "$$24$$",
        },
      ],
    },
  },
};

export default item;
