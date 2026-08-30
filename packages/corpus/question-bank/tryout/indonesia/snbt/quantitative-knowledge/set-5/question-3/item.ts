import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Wenn $$(1)$$, $$(2)$$ und $$(3)$$ korrekt sind.",
        },
        {
          isCorrect: true,
          label: "Wenn nur $$(4)$$ korrekt ist.",
        },
        {
          isCorrect: false,
          label: "Wenn $$(1)$$ und $$(3)$$ korrekt sind.",
        },
        {
          isCorrect: false,
          label: "Wenn $$(2)$$ und $$(4)$$ korrekt sind.",
        },
        {
          isCorrect: false,
          label: "Wenn alles richtig ist.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "If $$(1)$$, $$(2)$$, and $$(3)$$ are correct.",
        },
        {
          isCorrect: true,
          label: "If only $$(4)$$ is correct.",
        },
        {
          isCorrect: false,
          label: "If $$(1)$$ and $$(3)$$ are correct.",
        },
        {
          isCorrect: false,
          label: "If $$(2)$$ and $$(4)$$ are correct.",
        },
        {
          isCorrect: false,
          label: "If all are correct.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Jika $$(1)$$, $$(2)$$, dan $$(3)$$ yang betul.",
        },
        {
          isCorrect: true,
          label: "Jika $$(4)$$ saja yang betul.",
        },
        {
          isCorrect: false,
          label: "Jika $$(1)$$ dan $$(3)$$ yang betul.",
        },
        {
          isCorrect: false,
          label: "Jika $$(2)$$ dan $$(4)$$ yang betul.",
        },
        {
          isCorrect: false,
          label: "Jika semuanya betul.",
        },
      ],
    },
  },
};

export default item;
