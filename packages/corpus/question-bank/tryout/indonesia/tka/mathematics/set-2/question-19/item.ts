import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "9 cm" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "12 cm" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "15 cm" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "18 cm" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "21 cm" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "9 cm" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "12 cm" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "15 cm" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "18 cm" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "21 cm" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "9 cm" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "12 cm" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "15 cm" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "18 cm" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "21 cm" }],
        },
      ],
    },
  },
};

export default item;
