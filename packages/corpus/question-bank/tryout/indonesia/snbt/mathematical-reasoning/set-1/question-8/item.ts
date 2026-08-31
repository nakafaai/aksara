import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-23
const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$5 - x$$",
        },
        {
          isCorrect: false,
          label: "$$x - 5$$",
        },
        {
          isCorrect: false,
          label: "$$x + 5$$",
        },
        {
          isCorrect: false,
          label: "$$5 - 2x$$",
        },
        {
          isCorrect: false,
          label: "$$2x - 5$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$5 - x$$",
        },
        {
          isCorrect: false,
          label: "$$x - 5$$",
        },
        {
          isCorrect: false,
          label: "$$x + 5$$",
        },
        {
          isCorrect: false,
          label: "$$5 - 2x$$",
        },
        {
          isCorrect: false,
          label: "$$2x - 5$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$5 - x$$",
        },
        {
          isCorrect: false,
          label: "$$x - 5$$",
        },
        {
          isCorrect: false,
          label: "$$x + 5$$",
        },
        {
          isCorrect: false,
          label: "$$5 - 2x$$",
        },
        {
          isCorrect: false,
          label: "$$2x - 5$$",
        },
      ],
    },
  },
};

export default item;
