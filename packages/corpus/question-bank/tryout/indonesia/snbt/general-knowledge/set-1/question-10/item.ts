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
          isCorrect: false,
          label: "entwickelte sich.",
        },
        {
          isCorrect: true,
          label: "nahm ab.",
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
          isCorrect: false,
          label: "progressive.",
        },
        {
          isCorrect: true,
          label: "decreased.",
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
          isCorrect: false,
          label: "progresif.",
        },
        {
          isCorrect: true,
          label: "menurun.",
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
