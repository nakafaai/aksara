import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "nach denselben Grundsätzen ohne Widerspruch",
        },
        {
          isCorrect: false,
          label: "klar und unmittelbar ausgedrückt",
        },
        {
          isCorrect: false,
          label: "für mehr als eine Deutung offen",
        },
        {
          isCorrect: true,
          label: "über die betrachtete Zeit ohne große Schwankung bleibend",
        },
        {
          isCorrect: false,
          label: "durch verlässliche Belege gestützt",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "following the same principles without contradiction",
        },
        {
          isCorrect: false,
          label: "stated clearly and directly",
        },
        {
          isCorrect: false,
          label: "open to more than one interpretation",
        },
        {
          isCorrect: true,
          label: "remaining without large variation over the period considered",
        },
        {
          isCorrect: false,
          label: "supported by dependable evidence",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "mengikuti prinsip yang sama tanpa pertentangan",
        },
        {
          isCorrect: false,
          label: "dinyatakan secara jelas dan langsung",
        },
        {
          isCorrect: false,
          label: "terbuka terhadap lebih dari satu penafsiran",
        },
        {
          isCorrect: true,
          label: "tetap tanpa perubahan besar selama waktu yang diamati",
        },
        {
          isCorrect: false,
          label: "didukung oleh bukti yang dapat dipercaya",
        },
      ],
    },
  },
};

export default item;
