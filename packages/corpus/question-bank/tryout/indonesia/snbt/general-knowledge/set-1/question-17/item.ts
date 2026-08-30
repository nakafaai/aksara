import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Onkel.",
        },
        {
          isCorrect: true,
          label: "gefallen.",
        },
        {
          isCorrect: false,
          label: "Nation.",
        },
        {
          isCorrect: false,
          label: "Held.",
        },
        {
          isCorrect: false,
          label: "Feind.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "uncle.",
        },
        {
          isCorrect: true,
          label: "fell.",
        },
        {
          isCorrect: false,
          label: "nation.",
        },
        {
          isCorrect: false,
          label: "hero.",
        },
        {
          isCorrect: false,
          label: "enemy.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "paman.",
        },
        {
          isCorrect: true,
          label: "gugur.",
        },
        {
          isCorrect: false,
          label: "bangsa.",
        },
        {
          isCorrect: false,
          label: "pahlawan.",
        },
        {
          isCorrect: false,
          label: "musuh.",
        },
      ],
    },
  },
};

export default item;
