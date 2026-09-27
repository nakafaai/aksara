import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$2025$$",
        },
        {
          isCorrect: false,
          label: "$$2026$$",
        },
        {
          isCorrect: false,
          label: "$$2028$$",
        },
        {
          isCorrect: true,
          label: "$$2027$$",
        },
        {
          isCorrect: false,
          label: "$$4052$$",
        },
      ],
    },
  },
};

export default item;
