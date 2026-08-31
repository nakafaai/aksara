import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Satz $$(2)$$.",
        },
        {
          isCorrect: false,
          label: "Satz $$(4)$$.",
        },
        {
          isCorrect: false,
          label: "Satz $$(13)$$.",
        },
        {
          isCorrect: false,
          label: "Satz $$(15)$$.",
        },
        {
          isCorrect: true,
          label: "Satz $$(12)$$.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "sentence $$(2)$$.",
        },
        {
          isCorrect: false,
          label: "sentence $$(4)$$.",
        },
        {
          isCorrect: false,
          label: "sentence $$(13)$$.",
        },
        {
          isCorrect: false,
          label: "sentence $$(15)$$.",
        },
        {
          isCorrect: true,
          label: "sentence $$(12)$$.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "kalimat $$(2)$$.",
        },
        {
          isCorrect: false,
          label: "kalimat $$(4)$$.",
        },
        {
          isCorrect: false,
          label: "kalimat $$(13)$$.",
        },
        {
          isCorrect: false,
          label: "kalimat $$(15)$$.",
        },
        {
          isCorrect: true,
          label: "kalimat $$(12)$$.",
        },
      ],
    },
  },
};

export default item;
