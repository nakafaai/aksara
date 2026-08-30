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
          label: "Satz $$(5)$$.",
        },
        {
          isCorrect: true,
          label: "Satz $$(4)$$.",
        },
        {
          isCorrect: false,
          label: "Satz $$(7)$$.",
        },
        {
          isCorrect: false,
          label: "Satz $$(9)$$.",
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
          label: "sentence $$(5)$$.",
        },
        {
          isCorrect: true,
          label: "sentence $$(4)$$.",
        },
        {
          isCorrect: false,
          label: "sentence $$(7)$$.",
        },
        {
          isCorrect: false,
          label: "sentence $$(9)$$.",
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
          label: "kalimat $$(5)$$.",
        },
        {
          isCorrect: true,
          label: "kalimat $$(4)$$.",
        },
        {
          isCorrect: false,
          label: "kalimat $$(7)$$.",
        },
        {
          isCorrect: false,
          label: "kalimat $$(9)$$.",
        },
      ],
    },
  },
};

export default item;
