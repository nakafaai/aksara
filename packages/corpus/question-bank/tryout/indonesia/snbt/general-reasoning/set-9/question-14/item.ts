import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "A, C, B, D, E",
        },
        {
          isCorrect: false,
          label: "D, C, A, E, B",
        },
        {
          isCorrect: false,
          label: "E, D, A, C, B",
        },
        {
          isCorrect: true,
          label: "D, A, C, E, B",
        },
        {
          isCorrect: false,
          label: "A, D, C, B, E",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "A, C, B, D, E",
        },
        {
          isCorrect: false,
          label: "D, C, A, E, B",
        },
        {
          isCorrect: false,
          label: "E, D, A, C, B",
        },
        {
          isCorrect: true,
          label: "D, A, C, E, B",
        },
        {
          isCorrect: false,
          label: "A, D, C, B, E",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "A, C, B, D, E",
        },
        {
          isCorrect: false,
          label: "D, C, A, E, B",
        },
        {
          isCorrect: false,
          label: "E, D, A, C, B",
        },
        {
          isCorrect: true,
          label: "D, A, C, E, B",
        },
        {
          isCorrect: false,
          label: "A, D, C, B, E",
        },
      ],
    },
  },
};

export default item;
