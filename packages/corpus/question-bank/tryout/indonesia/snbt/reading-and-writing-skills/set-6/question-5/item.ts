import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Aus diesem Grund",
        },
        {
          isCorrect: false,
          label: "Sogar",
        },
        {
          isCorrect: true,
          label: "Dagegen",
        },
        {
          isCorrect: false,
          label: "Zuvor",
        },
        {
          isCorrect: false,
          label: "Anschließend",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "For that reason",
        },
        {
          isCorrect: false,
          label: "Indeed",
        },
        {
          isCorrect: true,
          label: "In contrast",
        },
        {
          isCorrect: false,
          label: "Previously",
        },
        {
          isCorrect: false,
          label: "Afterwards",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Oleh sebab itu",
        },
        {
          isCorrect: false,
          label: "Bahkan",
        },
        {
          isCorrect: true,
          label: "Sebaliknya",
        },
        {
          isCorrect: false,
          label: "Sebelumnya",
        },
        {
          isCorrect: false,
          label: "Sesudahnya",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
