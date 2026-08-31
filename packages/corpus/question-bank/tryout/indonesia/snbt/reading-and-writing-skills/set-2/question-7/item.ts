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
          isCorrect: true,
          label: "tritt auf, wenn.",
        },
        {
          isCorrect: false,
          label: "damit.",
        },
        {
          isCorrect: false,
          label: "außer wenn.",
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
          label: "even though.",
        },
        {
          isCorrect: true,
          label: "occurs when.",
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
          isCorrect: true,
          label: "terjadi ketika.",
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
          isCorrect: false,
          label: "setelah.",
        },
      ],
    },
  },
};

export default item;
