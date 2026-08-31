import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$0 \\leq x \\leq 30$$",
        },
        {
          isCorrect: true,
          label: "$$30 \\leq x \\leq 40$$",
        },
        {
          isCorrect: false,
          label: "$$30 \\leq x \\leq 35$$",
        },
        {
          isCorrect: false,
          label: "$$20 \\leq x \\leq 30$$",
        },
        {
          isCorrect: false,
          label: "Kann nicht bestimmt werden",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$0 \\leq x \\leq 30$$",
        },
        {
          isCorrect: true,
          label: "$$30 \\leq x \\leq 40$$",
        },
        {
          isCorrect: false,
          label: "$$30 \\leq x \\leq 35$$",
        },
        {
          isCorrect: false,
          label: "$$20 \\leq x \\leq 30$$",
        },
        {
          isCorrect: false,
          label: "Cannot be determined",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$0 \\leq x \\leq 30$$",
        },
        {
          isCorrect: true,
          label: "$$30 \\leq x \\leq 40$$",
        },
        {
          isCorrect: false,
          label: "$$30 \\leq x \\leq 35$$",
        },
        {
          isCorrect: false,
          label: "$$20 \\leq x \\leq 30$$",
        },
        {
          isCorrect: false,
          label: "Tidak dapat ditentukan",
        },
      ],
    },
  },
};

export default item;
