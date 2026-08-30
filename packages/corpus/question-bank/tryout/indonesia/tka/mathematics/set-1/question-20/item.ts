import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "4 m" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "5 m" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "6 m" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "7 m" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "8 m" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "4 m" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "5 m" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "6 m" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "7 m" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "8 m" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "4 m" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "5 m" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "6 m" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "7 m" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "8 m" }],
        },
      ],
    },
  },
};

export default item;
