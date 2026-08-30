import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Q, P, R, N",
        },
        {
          isCorrect: true,
          label: "P, N, R, Q",
        },
        {
          isCorrect: false,
          label: "R, P, N, Q",
        },
        {
          isCorrect: false,
          label: "N, P, Q, R",
        },
        {
          isCorrect: false,
          label: "P, Q, N, R",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Q, P, R, N",
        },
        {
          isCorrect: true,
          label: "P, N, R, Q",
        },
        {
          isCorrect: false,
          label: "R, P, N, Q",
        },
        {
          isCorrect: false,
          label: "N, P, Q, R",
        },
        {
          isCorrect: false,
          label: "P, Q, N, R",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Q, P, R, N",
        },
        {
          isCorrect: true,
          label: "P, N, R, Q",
        },
        {
          isCorrect: false,
          label: "R, P, N, Q",
        },
        {
          isCorrect: false,
          label: "N, P, Q, R",
        },
        {
          isCorrect: false,
          label: "P, Q, N, R",
        },
      ],
    },
  },
};

export default item;
