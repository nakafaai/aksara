import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Woche 2 zu Woche 4",
        },
        {
          isCorrect: true,
          label: "Woche 1 zu Woche 2",
        },
        {
          isCorrect: false,
          label: "Woche 2 zu Woche 3",
        },
        {
          isCorrect: false,
          label: "Woche 3 zu Woche 4",
        },
        {
          isCorrect: false,
          label: "Woche 1 zu Woche 3",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Week 2 to Week 4",
        },
        {
          isCorrect: true,
          label: "Week 1 to Week 2",
        },
        {
          isCorrect: false,
          label: "Week 2 to Week 3",
        },
        {
          isCorrect: false,
          label: "Week 3 to Week 4",
        },
        {
          isCorrect: false,
          label: "Week 1 to Week 3",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Minggu 2 ke Minggu 4",
        },
        {
          isCorrect: true,
          label: "Minggu 1 ke Minggu 2",
        },
        {
          isCorrect: false,
          label: "Minggu 2 ke Minggu 3",
        },
        {
          isCorrect: false,
          label: "Minggu 3 ke Minggu 4",
        },
        {
          isCorrect: false,
          label: "Minggu 1 ke Minggu 3",
        },
      ],
    },
  },
};

export default item;
