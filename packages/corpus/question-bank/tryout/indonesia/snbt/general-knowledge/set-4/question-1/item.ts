import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "für mehr als eine Deutung offen",
        },
        {
          isCorrect: false,
          label: "genau und frei von vermeidbarer Mehrdeutigkeit",
        },
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
          label: "durch verlässliche Belege gestützt",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "open to more than one interpretation",
        },
        {
          isCorrect: false,
          label: "exact and free from avoidable ambiguity",
        },
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
          label: "supported by dependable evidence",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "terbuka terhadap lebih dari satu penafsiran",
        },
        {
          isCorrect: false,
          label: "tepat dan tidak menimbulkan ketaksaan yang dapat dihindari",
        },
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
          label: "didukung oleh bukti yang dapat dipercaya",
        },
      ],
    },
  },
};

export default item;
