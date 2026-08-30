import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$150\\text{ Gramm}$$",
        },
        {
          isCorrect: false,
          label: "$$175\\text{ Gramm}$$",
        },
        {
          isCorrect: true,
          label: "$$225\\text{ Gramm}$$",
        },
        {
          isCorrect: false,
          label: "$$250\\text{ Gramm}$$",
        },
        {
          isCorrect: false,
          label: "$$275\\text{ Gramm}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$150\\text{ grams}$$",
        },
        {
          isCorrect: false,
          label: "$$175\\text{ grams}$$",
        },
        {
          isCorrect: true,
          label: "$$225\\text{ grams}$$",
        },
        {
          isCorrect: false,
          label: "$$250\\text{ grams}$$",
        },
        {
          isCorrect: false,
          label: "$$275\\text{ grams}$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$150\\text{ gram}$$",
        },
        {
          isCorrect: false,
          label: "$$175\\text{ gram}$$",
        },
        {
          isCorrect: true,
          label: "$$225\\text{ gram}$$",
        },
        {
          isCorrect: false,
          label: "$$250\\text{ gram}$$",
        },
        {
          isCorrect: false,
          label: "$$275\\text{ gram}$$",
        },
      ],
    },
  },
};

export default item;
