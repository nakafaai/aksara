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
          isCorrect: false,
          label: "klar und unmittelbar ausgedrückt",
        },
        {
          isCorrect: true,
          label:
            "darauf gerichtet, ein Problem vor seinem Auftreten zu verhindern",
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
          isCorrect: false,
          label: "stated clearly and directly",
        },
        {
          isCorrect: true,
          label: "intended to stop a problem before it occurs",
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
          isCorrect: false,
          label: "dinyatakan secara jelas dan langsung",
        },
        {
          isCorrect: true,
          label: "ditujukan untuk mencegah masalah sebelum terjadi",
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
