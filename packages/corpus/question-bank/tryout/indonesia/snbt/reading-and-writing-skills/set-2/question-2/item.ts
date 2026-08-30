import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Satz $$(11)$$.",
        },
        {
          isCorrect: false,
          label: "Satz $$(12)$$.",
        },
        {
          isCorrect: false,
          label: "Satz $$(13)$$.",
        },
        {
          isCorrect: false,
          label: "Satz $$(14)$$.",
        },
        {
          isCorrect: false,
          label: "Satz $$(15)$$.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "sentence $$(11)$$.",
        },
        {
          isCorrect: false,
          label: "sentence $$(12)$$.",
        },
        {
          isCorrect: false,
          label: "sentence $$(13)$$.",
        },
        {
          isCorrect: false,
          label: "sentence $$(14)$$.",
        },
        {
          isCorrect: false,
          label: "sentence $$(15)$$.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "kalimat $$(11)$$.",
        },
        {
          isCorrect: false,
          label: "kalimat $$(12)$$.",
        },
        {
          isCorrect: false,
          label: "kalimat $$(13)$$.",
        },
        {
          isCorrect: false,
          label: "kalimat $$(14)$$.",
        },
        {
          isCorrect: false,
          label: "kalimat $$(15)$$.",
        },
      ],
    },
  },
};

export default item;
