import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Notizbücher",
        },
        {
          isCorrect: false,
          label: "Kugelschreiber",
        },
        {
          isCorrect: false,
          label: "Notizbücher und Bleistifte",
        },
        {
          isCorrect: false,
          label: "Alle bringen den gleichen Gewinn",
        },
        {
          isCorrect: true,
          label: "Bleistifte",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Notebooks" },
        { isCorrect: false, label: "Ballpoints" },
        {
          isCorrect: false,
          label: "Notebooks and Pencils",
        },
        {
          isCorrect: false,
          label: "All give equal profit",
        },
        { isCorrect: true, label: "Pencils" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Buku tulis" },
        { isCorrect: false, label: "Bolpoin" },
        {
          isCorrect: false,
          label: "Buku tulis dan Pensil",
        },
        {
          isCorrect: false,
          label: "Semua memberikan keuntungan sama",
        },
        { isCorrect: true, label: "Pensil" },
      ],
    },
  },
};

export default item;
