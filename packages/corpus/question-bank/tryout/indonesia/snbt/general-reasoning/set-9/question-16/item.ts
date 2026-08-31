import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Tim A",
        },
        {
          isCorrect: true,
          label: "Tim C",
        },
        {
          isCorrect: false,
          label: "Tim B",
        },
        {
          isCorrect: false,
          label: "Tim A dan B",
        },
        {
          isCorrect: false,
          label: "Ketiganya sama",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Tim A",
        },
        {
          isCorrect: true,
          label: "Tim C",
        },
        {
          isCorrect: false,
          label: "Tim B",
        },
        {
          isCorrect: false,
          label: "Tim A dan B",
        },
        {
          isCorrect: false,
          label: "Ketiganya sama",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Tim A",
        },
        {
          isCorrect: true,
          label: "Tim C",
        },
        {
          isCorrect: false,
          label: "Tim B",
        },
        {
          isCorrect: false,
          label: "Tim A dan B",
        },
        {
          isCorrect: false,
          label: "Ketiganya sama",
        },
      ],
    },
  },
};

export default item;
