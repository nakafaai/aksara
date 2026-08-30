import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$A = B$$",
        },
        {
          isCorrect: false,
          label: "$$A = 2B$$",
        },
        {
          isCorrect: true,
          label: "$$A > B$$",
        },
        {
          isCorrect: false,
          label: "$$A < B$$",
        },
        {
          isCorrect: false,
          label: "$$A = \\frac{1}{2}B$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$A = B$$",
        },
        {
          isCorrect: false,
          label: "$$A = 2B$$",
        },
        {
          isCorrect: true,
          label: "$$A > B$$",
        },
        {
          isCorrect: false,
          label: "$$A < B$$",
        },
        {
          isCorrect: false,
          label: "$$A = \\frac{1}{2}B$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$A = B$$",
        },
        {
          isCorrect: false,
          label: "$$A = 2B$$",
        },
        {
          isCorrect: true,
          label: "$$A > B$$",
        },
        {
          isCorrect: false,
          label: "$$A < B$$",
        },
        {
          isCorrect: false,
          label: "$$A = \\frac{1}{2}B$$",
        },
      ],
    },
  },
};

export default item;
