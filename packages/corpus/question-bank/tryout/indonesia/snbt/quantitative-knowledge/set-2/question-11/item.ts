import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-22
const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$x \\in [2, 5) \\cup [5, 8)$$",
        },
        {
          isCorrect: false,
          label: "$$x \\in [0, 2) \\cup [5, 10)$$",
        },
        {
          isCorrect: false,
          label: "$$x \\in [2, 8)$$",
        },
        {
          isCorrect: false,
          label: "$$x \\in [5, 10)$$",
        },
        {
          isCorrect: true,
          label: "$$x \\in [2, 10)$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$x \\in [2, 5) \\cup [5, 8)$$",
        },
        {
          isCorrect: false,
          label: "$$x \\in [0, 2) \\cup [5, 10)$$",
        },
        {
          isCorrect: false,
          label: "$$x \\in [2, 8)$$",
        },
        {
          isCorrect: false,
          label: "$$x \\in [5, 10)$$",
        },
        {
          isCorrect: true,
          label: "$$x \\in [2, 10)$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$x \\in [2, 5) \\cup [5, 8)$$",
        },
        {
          isCorrect: false,
          label: "$$x \\in [0, 2) \\cup [5, 10)$$",
        },
        {
          isCorrect: false,
          label: "$$x \\in [2, 8)$$",
        },
        {
          isCorrect: false,
          label: "$$x \\in [5, 10)$$",
        },
        {
          isCorrect: true,
          label: "$$x \\in [2, 10)$$",
        },
      ],
    },
  },
};

export default item;
