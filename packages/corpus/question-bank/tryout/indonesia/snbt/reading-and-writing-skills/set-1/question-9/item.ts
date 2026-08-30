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
          label: "Satz $$(6)$$.",
        },
        {
          isCorrect: false,
          label: "Satz $$(7)$$.",
        },
        {
          isCorrect: true,
          label: "Satz $$(8)$$.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Sentence $$(2)$$.",
        },
        {
          isCorrect: false,
          label: "Sentence $$(4)$$.",
        },
        {
          isCorrect: false,
          label: "Sentence $$(6)$$.",
        },
        {
          isCorrect: false,
          label: "Sentence $$(7)$$.",
        },
        {
          isCorrect: true,
          label: "Sentence $$(8)$$.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kalimat $$(2)$$.",
        },
        {
          isCorrect: false,
          label: "Kalimat $$(4)$$.",
        },
        {
          isCorrect: false,
          label: "Kalimat $$(6)$$.",
        },
        {
          isCorrect: false,
          label: "Kalimat $$(7)$$.",
        },
        {
          isCorrect: true,
          label: "Kalimat $$(8)$$.",
        },
      ],
    },
  },
};

export default item;
