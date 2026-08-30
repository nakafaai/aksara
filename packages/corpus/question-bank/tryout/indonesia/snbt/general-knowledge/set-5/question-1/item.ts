import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "genau und frei von vermeidbarer Mehrdeutigkeit",
        },
        {
          isCorrect: false,
          label: "nach denselben Grundsätzen ohne Widerspruch",
        },
        {
          isCorrect: true,
          label: "deutlich genug, um beachtet zu werden",
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
          isCorrect: false,
          label: "exact and free from avoidable ambiguity",
        },
        {
          isCorrect: false,
          label: "following the same principles without contradiction",
        },
        {
          isCorrect: true,
          label: "large or important enough to deserve attention",
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
          isCorrect: false,
          label: "tepat dan tidak menimbulkan ketaksaan yang dapat dihindari",
        },
        {
          isCorrect: false,
          label: "mengikuti prinsip yang sama tanpa pertentangan",
        },
        {
          isCorrect: true,
          label: "cukup besar atau penting untuk diperhatikan",
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
