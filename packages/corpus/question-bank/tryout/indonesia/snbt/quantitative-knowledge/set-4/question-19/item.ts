import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$2{,}5$$ Liter",
        },
        {
          isCorrect: false,
          label: "$$5$$ Liter",
        },
        {
          isCorrect: false,
          label: "$$7{,}5$$ Liter",
        },
        {
          isCorrect: true,
          label: "$$12{,}5$$ Liter",
        },
        {
          isCorrect: false,
          label: "$$10$$ Liter",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$2.5$$ liters",
        },
        {
          isCorrect: false,
          label: "$$5$$ liters",
        },
        {
          isCorrect: false,
          label: "$$7.5$$ liters",
        },
        {
          isCorrect: true,
          label: "$$12.5$$ liters",
        },
        {
          isCorrect: false,
          label: "$$10$$ liters",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$2{,}5$$ liter",
        },
        {
          isCorrect: false,
          label: "$$5$$ liter",
        },
        {
          isCorrect: false,
          label: "$$7{,}5$$ liter",
        },
        {
          isCorrect: true,
          label: "$$12{,}5$$ liter",
        },
        {
          isCorrect: false,
          label: "$$10$$ liter",
        },
      ],
    },
  },
};

export default item;
