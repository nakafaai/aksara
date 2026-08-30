import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$(1)$$, $$(2)$$ und $$(3)$$ sind korrekt",
        },
        {
          isCorrect: true,
          label: "$$(2)$$ und $$(4)$$ sind korrekt",
        },
        {
          isCorrect: false,
          label: "$$(1)$$ und $$(3)$$ sind korrekt",
        },
        {
          isCorrect: false,
          label: "Nur $$(4)$$ ist korrekt",
        },
        {
          isCorrect: false,
          label: "alle sind richtig",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$(1)$$, $$(2)$$, and $$(3)$$ are correct",
        },
        {
          isCorrect: true,
          label: "$$(2)$$ and $$(4)$$ are correct",
        },
        {
          isCorrect: false,
          label: "$$(1)$$ and $$(3)$$ are correct",
        },
        {
          isCorrect: false,
          label: "$$(4)$$ only is correct",
        },
        {
          isCorrect: false,
          label: "all are correct",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$(1)$$, $$(2)$$, dan $$(3)$$ benar",
        },
        {
          isCorrect: true,
          label: "$$(2)$$ dan $$(4)$$ benar",
        },
        {
          isCorrect: false,
          label: "$$(1)$$ dan $$(3)$$ benar",
        },
        {
          isCorrect: false,
          label: "$$(4)$$ saja benar",
        },
        {
          isCorrect: false,
          label: "semua benar",
        },
      ],
    },
  },
};

export default item;
