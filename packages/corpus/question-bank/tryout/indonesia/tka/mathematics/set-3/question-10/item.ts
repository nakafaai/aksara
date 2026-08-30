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
          label: "12 cm",
        },
        {
          isCorrect: false,
          label: "16 cm",
        },
        {
          isCorrect: false,
          label: "24 cm",
        },
        {
          isCorrect: true,
          label: "20 cm",
        },
        {
          isCorrect: false,
          label: "28 cm",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "12 cm",
        },
        {
          isCorrect: false,
          label: "16 cm",
        },
        {
          isCorrect: false,
          label: "24 cm",
        },
        {
          isCorrect: true,
          label: "20 cm",
        },
        {
          isCorrect: false,
          label: "28 cm",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "12 cm",
        },
        {
          isCorrect: false,
          label: "16 cm",
        },
        {
          isCorrect: false,
          label: "24 cm",
        },
        {
          isCorrect: true,
          label: "20 cm",
        },
        {
          isCorrect: false,
          label: "28 cm",
        },
      ],
    },
  },
};

export default item;
