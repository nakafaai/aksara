import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "selten.",
        },
        {
          isCorrect: true,
          label: "oft.",
        },
        {
          isCorrect: false,
          label: "plötzlich.",
        },
        {
          isCorrect: false,
          label: "getrennt.",
        },
        {
          isCorrect: false,
          label: "vielleicht.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "rarely.",
        },
        {
          isCorrect: true,
          label: "often.",
        },
        {
          isCorrect: false,
          label: "suddenly.",
        },
        {
          isCorrect: false,
          label: "separately.",
        },
        {
          isCorrect: false,
          label: "perhaps.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "jarang.",
        },
        {
          isCorrect: true,
          label: "sering.",
        },
        {
          isCorrect: false,
          label: "tiba-tiba.",
        },
        {
          isCorrect: false,
          label: "terpisah.",
        },
        {
          isCorrect: false,
          label: "mungkin.",
        },
      ],
    },
  },
};

export default item;
