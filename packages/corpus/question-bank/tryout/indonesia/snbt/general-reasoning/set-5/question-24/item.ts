import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "S, Q, P, R",
        },
        {
          isCorrect: false,
          label: "P, Q, R, S",
        },
        {
          isCorrect: false,
          label: "Q, R, P, S",
        },
        {
          isCorrect: true,
          label: "Q, P, S, R",
        },
        {
          isCorrect: false,
          label: "R, Q, S, P",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "S, Q, P, R",
        },
        {
          isCorrect: false,
          label: "P, Q, R, S",
        },
        {
          isCorrect: false,
          label: "Q, R, P, S",
        },
        {
          isCorrect: true,
          label: "Q, P, S, R",
        },
        {
          isCorrect: false,
          label: "R, Q, S, P",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "S, Q, P, R",
        },
        {
          isCorrect: false,
          label: "P, Q, R, S",
        },
        {
          isCorrect: false,
          label: "Q, R, P, S",
        },
        {
          isCorrect: true,
          label: "Q, P, S, R",
        },
        {
          isCorrect: false,
          label: "R, Q, S, P",
        },
      ],
    },
  },
};

export default item;
