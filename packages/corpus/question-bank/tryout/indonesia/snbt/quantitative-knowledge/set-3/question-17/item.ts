import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Die Aussagen $$(1)$$, $$(2)$$ und $$(3)$$ sind richtig",
        },
        {
          isCorrect: false,
          label: "Die Aussagen $$(1)$$ und $$(3)$$ sind richtig",
        },
        {
          isCorrect: true,
          label: "Die Aussagen $$(2)$$ und $$(4)$$ sind richtig",
        },
        {
          isCorrect: false,
          label: "Nur Aussage $$(4)$$ ist richtig",
        },
        {
          isCorrect: false,
          label: "Alle Aussagen sind richtig",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Statements $$(1)$$, $$(2)$$, and $$(3)$$ are correct",
        },
        {
          isCorrect: false,
          label: "Statements $$(1)$$ and $$(3)$$ are correct",
        },
        {
          isCorrect: true,
          label: "Statements $$(2)$$ and $$(4)$$ are correct",
        },
        {
          isCorrect: false,
          label: "Only statement $$(4)$$ is correct",
        },
        {
          isCorrect: false,
          label: "All statements are correct",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Pernyataan $$(1)$$, $$(2)$$, dan $$(3)$$ benar",
        },
        {
          isCorrect: false,
          label: "Pernyataan $$(1)$$ dan $$(3)$$ benar",
        },
        {
          isCorrect: true,
          label: "Pernyataan $$(2)$$ dan $$(4)$$ benar",
        },
        {
          isCorrect: false,
          label: "Hanya pernyataan $$(4)$$ yang benar",
        },
        {
          isCorrect: false,
          label: "Semua pernyataan benar",
        },
      ],
    },
  },
};

export default item;
