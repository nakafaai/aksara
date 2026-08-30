import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Notizbücher" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kugelschreiber" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Bleistifte" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Notizbücher und Bleistifte" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Alle bringen den gleichen Gewinn" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "Notebooks" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Ballpoints" }] },
        { isCorrect: true, label: [{ kind: "text", text: "Pencils" }] },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Notebooks and Pencils" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "All give equal profit" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "Buku tulis" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Bolpoin" }] },
        { isCorrect: true, label: [{ kind: "text", text: "Pensil" }] },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Buku tulis dan Pensil" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Semua memberikan keuntungan sama" }],
        },
      ],
    },
  },
};

export default item;
