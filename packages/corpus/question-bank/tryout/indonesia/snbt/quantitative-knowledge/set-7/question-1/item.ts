import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$(1)$$, $$(2)$$ und $$(3)$$ sind richtig.",
        },
        {
          isCorrect: false,
          label: "$$(2)$$ und $$(4)$$ sind richtig.",
        },
        {
          isCorrect: false,
          label: "Nur $$(4)$$ ist richtig.",
        },
        {
          isCorrect: false,
          label: "Alle Aussagen sind richtig.",
        },
        {
          isCorrect: true,
          label: "$$(1)$$ und $$(3)$$ sind richtig.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$(1)$$, $$(2)$$, and $$(3)$$ are correct.",
        },
        {
          isCorrect: false,
          label: "$$(2)$$ and $$(4)$$ are correct.",
        },
        {
          isCorrect: false,
          label: "Only $$(4)$$ is correct.",
        },
        {
          isCorrect: false,
          label: "All statements are correct.",
        },
        {
          isCorrect: true,
          label: "$$(1)$$ and $$(3)$$ are correct.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$(1)$$, $$(2)$$, dan $$(3)$$ benar.",
        },
        {
          isCorrect: false,
          label: "$$(2)$$ dan $$(4)$$ benar.",
        },
        {
          isCorrect: false,
          label: "Hanya $$(4)$$ yang benar.",
        },
        {
          isCorrect: false,
          label: "Semua pernyataan benar.",
        },
        {
          isCorrect: true,
          label: "$$(1)$$ dan $$(3)$$ benar.",
        },
      ],
    },
  },
};

export default item;
