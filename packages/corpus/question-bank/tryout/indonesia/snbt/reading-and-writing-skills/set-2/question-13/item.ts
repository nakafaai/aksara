import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "obwohl.",
        },
        {
          isCorrect: false,
          label: "damit.",
        },
        {
          isCorrect: false,
          label: "sofern nicht.",
        },
        {
          isCorrect: true,
          label: "weil.",
        },
        {
          isCorrect: false,
          label: "nachdem.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "although.",
        },
        {
          isCorrect: false,
          label: "so that.",
        },
        {
          isCorrect: false,
          label: "unless.",
        },
        {
          isCorrect: true,
          label: "because.",
        },
        {
          isCorrect: false,
          label: "after.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "meskipun.",
        },
        {
          isCorrect: false,
          label: "agar.",
        },
        {
          isCorrect: false,
          label: "kecuali.",
        },
        {
          isCorrect: true,
          label: "karena.",
        },
        {
          isCorrect: false,
          label: "setelah.",
        },
      ],
    },
  },
};

export default item;
