import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "T, S, V, U",
        },
        {
          isCorrect: false,
          label: "U, T, V, S",
        },
        {
          isCorrect: false,
          label: "V, T, S, U",
        },
        {
          isCorrect: false,
          label: "S, T, U, V",
        },
        {
          isCorrect: false,
          label: "T, U, S, V",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "T, S, V, U",
        },
        {
          isCorrect: false,
          label: "U, T, V, S",
        },
        {
          isCorrect: false,
          label: "V, T, S, U",
        },
        {
          isCorrect: false,
          label: "S, T, U, V",
        },
        {
          isCorrect: false,
          label: "T, U, S, V",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "T, S, V, U",
        },
        {
          isCorrect: false,
          label: "U, T, V, S",
        },
        {
          isCorrect: false,
          label: "V, T, S, U",
        },
        {
          isCorrect: false,
          label: "S, T, U, V",
        },
        {
          isCorrect: false,
          label: "T, U, S, V",
        },
      ],
    },
  },
};

export default item;
