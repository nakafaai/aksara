import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Daher",
        },
        {
          isCorrect: false,
          label: "Ebenso",
        },
        {
          isCorrect: true,
          label: "Allerdings",
        },
        {
          isCorrect: false,
          label: "Danach",
        },
        {
          isCorrect: false,
          label: "Sogar",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Therefore",
        },
        {
          isCorrect: false,
          label: "Likewise",
        },
        {
          isCorrect: true,
          label: "However",
        },
        {
          isCorrect: false,
          label: "After that",
        },
        {
          isCorrect: false,
          label: "Indeed",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Oleh karena itu",
        },
        {
          isCorrect: false,
          label: "Demikian pula",
        },
        {
          isCorrect: true,
          label: "Namun",
        },
        {
          isCorrect: false,
          label: "Setelah itu",
        },
        {
          isCorrect: false,
          label: "Bahkan",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
