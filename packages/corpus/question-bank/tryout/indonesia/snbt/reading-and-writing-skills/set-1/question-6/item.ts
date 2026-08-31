import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Dagegen",
        },
        {
          isCorrect: false,
          label: "Deshalb",
        },
        {
          isCorrect: true,
          label: "Außerdem",
        },
        {
          isCorrect: false,
          label: "Dennoch",
        },
        {
          isCorrect: false,
          label: "Zum Beispiel",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "In contrast",
        },
        {
          isCorrect: false,
          label: "Therefore",
        },
        {
          isCorrect: true,
          label: "In addition",
        },
        {
          isCorrect: false,
          label: "Nevertheless",
        },
        {
          isCorrect: false,
          label: "For example",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Sebaliknya",
        },
        {
          isCorrect: false,
          label: "Oleh karena itu",
        },
        {
          isCorrect: true,
          label: "Selain itu",
        },
        {
          isCorrect: false,
          label: "Namun",
        },
        {
          isCorrect: false,
          label: "Misalnya",
        },
      ],
    },
  },
};

export default item;
