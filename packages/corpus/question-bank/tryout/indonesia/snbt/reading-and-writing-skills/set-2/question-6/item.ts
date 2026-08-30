import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ kind: "text", text: "oft." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "selten." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "plötzlich." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "getrennt." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "vielleicht." }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ kind: "text", text: "often." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "rarely." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "suddenly." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "separately." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "perhaps." }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ kind: "text", text: "sering." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "jarang." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "tiba-tiba." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "terpisah." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "mungkin." }],
        },
      ],
    },
  },
};

export default item;
