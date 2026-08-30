import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "B, C, A, D",
        },
        {
          isCorrect: false,
          label: "C, B, D, A",
        },
        {
          isCorrect: false,
          label: "D, B, A, C",
        },
        {
          isCorrect: true,
          label: "B, A, D, C",
        },
        {
          isCorrect: false,
          label: "A, B, C, D",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "B, C, A, D",
        },
        {
          isCorrect: false,
          label: "C, B, D, A",
        },
        {
          isCorrect: false,
          label: "D, B, A, C",
        },
        {
          isCorrect: true,
          label: "B, A, D, C",
        },
        {
          isCorrect: false,
          label: "A, B, C, D",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "B, C, A, D",
        },
        {
          isCorrect: false,
          label: "C, B, D, A",
        },
        {
          isCorrect: false,
          label: "D, B, A, C",
        },
        {
          isCorrect: true,
          label: "B, A, D, C",
        },
        {
          isCorrect: false,
          label: "A, B, C, D",
        },
      ],
    },
  },
};

export default item;
