import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Team A",
        },
        {
          isCorrect: true,
          label: "Team C",
        },
        {
          isCorrect: false,
          label: "Team B",
        },
        {
          isCorrect: false,
          label: "Team A und B",
        },
        {
          isCorrect: false,
          label: "Alle drei Teams haben denselben Wert",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Team A",
        },
        {
          isCorrect: true,
          label: "Team C",
        },
        {
          isCorrect: false,
          label: "Team B",
        },
        {
          isCorrect: false,
          label: "Team A and B",
        },
        {
          isCorrect: false,
          label: "All three teams have the same value",
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
