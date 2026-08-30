import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "X, W, Z, Y",
        },
        {
          isCorrect: false,
          label: "W, X, Y, Z",
        },
        {
          isCorrect: false,
          label: "X, Y, W, Z",
        },
        {
          isCorrect: false,
          label: "Y, X, Z, W",
        },
        {
          isCorrect: false,
          label: "Z, X, W, Y",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "X, W, Z, Y",
        },
        {
          isCorrect: false,
          label: "W, X, Y, Z",
        },
        {
          isCorrect: false,
          label: "X, Y, W, Z",
        },
        {
          isCorrect: false,
          label: "Y, X, Z, W",
        },
        {
          isCorrect: false,
          label: "Z, X, W, Y",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "X, W, Z, Y",
        },
        {
          isCorrect: false,
          label: "W, X, Y, Z",
        },
        {
          isCorrect: false,
          label: "X, Y, W, Z",
        },
        {
          isCorrect: false,
          label: "Y, X, Z, W",
        },
        {
          isCorrect: false,
          label: "Z, X, W, Y",
        },
      ],
    },
  },
};

export default item;
