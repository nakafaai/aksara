import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "vor Satz $$(7)$$.",
        },
        {
          isCorrect: true,
          label: "zwischen den Sätzen $$(5)$$ und $$(6)$$.",
        },
        {
          isCorrect: false,
          label: "zwischen den Sätzen $$(1)$$ und $$(2)$$.",
        },
        {
          isCorrect: false,
          label: "nach dem Satz $$(3)$$.",
        },
        {
          isCorrect: false,
          label: "zwischen den Sätzen $$(4)$$ und $$(5)$$.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "before sentence $$(7)$$.",
        },
        {
          isCorrect: true,
          label: "between sentences $$(5)$$ and $$(6)$$.",
        },
        {
          isCorrect: false,
          label: "between sentences $$(1)$$ and $$(2)$$.",
        },
        {
          isCorrect: false,
          label: "after sentence $$(3)$$.",
        },
        {
          isCorrect: false,
          label: "between sentences $$(4)$$ and $$(5)$$.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "sebelum kalimat $$(7)$$.",
        },
        {
          isCorrect: true,
          label: "antara kalimat $$(5)$$ dan $$(6)$$.",
        },
        {
          isCorrect: false,
          label: "antara kalimat $$(1)$$ dan $$(2)$$.",
        },
        {
          isCorrect: false,
          label: "setelah kalimat $$(3)$$.",
        },
        {
          isCorrect: false,
          label: "antara kalimat $$(4)$$ dan $$(5)$$.",
        },
      ],
    },
  },
};

export default item;
