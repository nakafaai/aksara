import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "konkurriert mit.",
        },
        {
          isCorrect: false,
          label: "ahmt nach.",
        },
        {
          isCorrect: true,
          label: "gleicht.",
        },
        {
          isCorrect: false,
          label: "folgt.",
        },
        {
          isCorrect: false,
          label: "ersetzt.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "competes with.",
        },
        {
          isCorrect: false,
          label: "imitates.",
        },
        {
          isCorrect: true,
          label: "looks like.",
        },
        {
          isCorrect: false,
          label: "follows.",
        },
        {
          isCorrect: false,
          label: "replaces.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "menyaingi.",
        },
        {
          isCorrect: false,
          label: "menirukan.",
        },
        {
          isCorrect: true,
          label: "mirip dengan.",
        },
        {
          isCorrect: false,
          label: "mengikuti.",
        },
        {
          isCorrect: false,
          label: "menggantikan.",
        },
      ],
    },
  },
};

export default item;
