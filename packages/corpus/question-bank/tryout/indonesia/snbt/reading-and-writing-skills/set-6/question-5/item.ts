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
          label: "Währenddessen",
        },
        {
          isCorrect: false,
          label: "Umgekehrt",
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
          label: "Meanwhile",
        },
        {
          isCorrect: false,
          label: "Conversely",
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
          label: "Sementara itu",
        },
        {
          isCorrect: false,
          label: "Sebaliknya",
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
