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
          label: [{ kind: "text", text: "12 cm" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "16 cm" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "20 cm" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "24 cm" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "28 cm" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "12 cm" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "16 cm" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "20 cm" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "24 cm" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "28 cm" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "12 cm" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "16 cm" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "20 cm" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "24 cm" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "28 cm" }],
        },
      ],
    },
  },
};

export default item;
