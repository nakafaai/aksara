import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "wuchs.",
        },
        {
          isCorrect: true,
          label: "nahm ab.",
        },
        {
          isCorrect: false,
          label: "entwickelte sich.",
        },
        {
          isCorrect: false,
          label: "stieg.",
        },
        {
          isCorrect: false,
          label: "erhöhte sich.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "growth.",
        },
        {
          isCorrect: true,
          label: "decreased.",
        },
        {
          isCorrect: false,
          label: "progressive.",
        },
        {
          isCorrect: false,
          label: "climbing.",
        },
        {
          isCorrect: false,
          label: "rising.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "pertumbuhan.",
        },
        {
          isCorrect: true,
          label: "menurun.",
        },
        {
          isCorrect: false,
          label: "progresif.",
        },
        {
          isCorrect: false,
          label: "menaiki.",
        },
        {
          isCorrect: false,
          label: "meninggi.",
        },
      ],
    },
  },
};

export default item;
