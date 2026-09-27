import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$120$$",
        },
        {
          isCorrect: false,
          label: "$$160$$",
        },
        {
          isCorrect: true,
          label: "$$158$$",
        },
        {
          isCorrect: false,
          label: "$$168$$",
        },
        {
          isCorrect: false,
          label: "$$200$$",
        },
      ],
    },
  },
};

export default item;
