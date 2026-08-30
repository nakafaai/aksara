import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "vor Satz $$(5)$$.",
        },
        {
          isCorrect: false,
          label: "nach dem Satz $$(4)$$.",
        },
        {
          isCorrect: false,
          label: "vor Satz $$(6)$$.",
        },
        {
          isCorrect: false,
          label: "nach dem Satz $$(7)$$.",
        },
        {
          isCorrect: true,
          label: "nach dem Satz $$(2)$$.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "before sentence $$(5)$$.",
        },
        {
          isCorrect: false,
          label: "after sentence $$(4)$$.",
        },
        {
          isCorrect: false,
          label: "before sentence $$(6)$$.",
        },
        {
          isCorrect: false,
          label: "after sentence $$(7)$$.",
        },
        {
          isCorrect: true,
          label: "after sentence $$(2)$$.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "sebelum kalimat $$(5)$$.",
        },
        {
          isCorrect: false,
          label: "setelah kalimat $$(4)$$.",
        },
        {
          isCorrect: false,
          label: "sebelum kalimat $$(6)$$.",
        },
        {
          isCorrect: false,
          label: "setelah kalimat $$(7)$$.",
        },
        {
          isCorrect: true,
          label: "setelah kalimat $$(2)$$.",
        },
      ],
    },
  },
};

export default item;
