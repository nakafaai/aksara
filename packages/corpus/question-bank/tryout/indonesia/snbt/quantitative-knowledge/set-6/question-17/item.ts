import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Nur $$(1)$$, $$(2)$$ und $$(3)$$ sind richtig.",
        },
        {
          isCorrect: false,
          label: "Nur $$(1)$$ und $$(3)$$ sind richtig.",
        },
        {
          isCorrect: true,
          label: "Nur $$(2)$$ und $$(4)$$ sind richtig.",
        },
        {
          isCorrect: false,
          label: "Nur $$(4)$$ ist richtig.",
        },
        {
          isCorrect: false,
          label: "Alle Aussagen sind richtig.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Only $$(1)$$, $$(2)$$, and $$(3)$$ are correct.",
        },
        { isCorrect: false, label: "Only $$(1)$$ and $$(3)$$ are correct." },
        { isCorrect: true, label: "Only $$(2)$$ and $$(4)$$ are correct." },
        { isCorrect: false, label: "Only $$(4)$$ is correct." },
        { isCorrect: false, label: "All statements are correct." },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Hanya $$(1)$$, $$(2)$$, dan $$(3)$$ yang benar.",
        },
        { isCorrect: false, label: "Hanya $$(1)$$ dan $$(3)$$ yang benar." },
        { isCorrect: true, label: "Hanya $$(2)$$ dan $$(4)$$ yang benar." },
        { isCorrect: false, label: "Hanya $$(4)$$ yang benar." },
        { isCorrect: false, label: "Semua pernyataan benar." },
      ],
    },
  },
};

export default item;
