import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$(1)$$, $$(2)$$ und $$(3)$$",
        },
        {
          isCorrect: true,
          label: "Alle vier Zahlen",
        },
        {
          isCorrect: false,
          label: "$$(1)$$ und $$(3)$$",
        },
        {
          isCorrect: false,
          label: "$$(2)$$ und $$(4)$$",
        },
        {
          isCorrect: false,
          label: "Nur $$(4)$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$(1)$$, $$(2)$$, and $$(3)$$",
        },
        {
          isCorrect: true,
          label: "All four numbers",
        },
        {
          isCorrect: false,
          label: "$$(1)$$ and $$(3)$$",
        },
        {
          isCorrect: false,
          label: "$$(2)$$ and $$(4)$$",
        },
        {
          isCorrect: false,
          label: "Only $$(4)$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$(1)$$, $$(2)$$, dan $$(3)$$",
        },
        {
          isCorrect: true,
          label: "Keempat bilangan",
        },
        {
          isCorrect: false,
          label: "$$(1)$$ dan $$(3)$$",
        },
        {
          isCorrect: false,
          label: "$$(2)$$ dan $$(4)$$",
        },
        {
          isCorrect: false,
          label: "Hanya $$(4)$$",
        },
      ],
    },
  },
};

export default item;
