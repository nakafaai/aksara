import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Satz $$(1)$$.",
        },
        {
          isCorrect: false,
          label: "Satz $$(5)$$.",
        },
        {
          isCorrect: false,
          label: "Satz $$(6)$$.",
        },
        {
          isCorrect: false,
          label: "Satz $$(8)$$.",
        },
        {
          isCorrect: true,
          label: "Satz $$(10)$$.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "sentence $$(1)$$.",
        },
        {
          isCorrect: false,
          label: "sentence $$(5)$$.",
        },
        {
          isCorrect: false,
          label: "sentence $$(6)$$.",
        },
        {
          isCorrect: false,
          label: "sentence $$(8)$$.",
        },
        {
          isCorrect: true,
          label: "sentence $$(10)$$.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "kalimat $$(1)$$.",
        },
        {
          isCorrect: false,
          label: "kalimat $$(5)$$.",
        },
        {
          isCorrect: false,
          label: "kalimat $$(6)$$.",
        },
        {
          isCorrect: false,
          label: "kalimat $$(8)$$.",
        },
        {
          isCorrect: true,
          label: "kalimat $$(10)$$.",
        },
      ],
    },
  },
};

export default item;
