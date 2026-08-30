import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "M, L, N, K",
        },
        {
          isCorrect: false,
          label: "N, L, K, M",
        },
        {
          isCorrect: false,
          label: "K, L, M, N",
        },
        {
          isCorrect: false,
          label: "L, M, K, N",
        },
        {
          isCorrect: true,
          label: "L, K, N, M",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "M, L, N, K",
        },
        {
          isCorrect: false,
          label: "N, L, K, M",
        },
        {
          isCorrect: false,
          label: "K, L, M, N",
        },
        {
          isCorrect: false,
          label: "L, M, K, N",
        },
        {
          isCorrect: true,
          label: "L, K, N, M",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "M, L, N, K",
        },
        {
          isCorrect: false,
          label: "N, L, K, M",
        },
        {
          isCorrect: false,
          label: "K, L, M, N",
        },
        {
          isCorrect: false,
          label: "L, M, K, N",
        },
        {
          isCorrect: true,
          label: "L, K, N, M",
        },
      ],
    },
  },
};

export default item;
