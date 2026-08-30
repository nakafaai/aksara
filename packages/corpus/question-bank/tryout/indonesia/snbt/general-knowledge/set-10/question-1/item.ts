import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "den Kern der Sache betreffend und nicht bloß oberflächlich",
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
          label: "für mehr als eine Deutung offen",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "concerning the core issue rather than surface form",
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
          label: "open to more than one interpretation",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "berkaitan dengan pokok masalah, bukan hanya bentuk luarnya",
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
          label: "terbuka terhadap lebih dari satu penafsiran",
        },
      ],
    },
  },
};

export default item;
