import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "K, L, J, M",
        },
        {
          isCorrect: false,
          label: "L, K, M, J",
        },
        {
          isCorrect: true,
          label: "K, J, M, L",
        },
        {
          isCorrect: false,
          label: "M, K, J, L",
        },
        {
          isCorrect: false,
          label: "J, K, L, M",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "K, L, J, M",
        },
        {
          isCorrect: false,
          label: "L, K, M, J",
        },
        {
          isCorrect: true,
          label: "K, J, M, L",
        },
        {
          isCorrect: false,
          label: "M, K, J, L",
        },
        {
          isCorrect: false,
          label: "J, K, L, M",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "K, L, J, M",
        },
        {
          isCorrect: false,
          label: "L, K, M, J",
        },
        {
          isCorrect: true,
          label: "K, J, M, L",
        },
        {
          isCorrect: false,
          label: "M, K, J, L",
        },
        {
          isCorrect: false,
          label: "J, K, L, M",
        },
      ],
    },
  },
};

export default item;
