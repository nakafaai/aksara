import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Produkt.",
        },
        {
          isCorrect: false,
          label: "produktiv.",
        },
        {
          isCorrect: false,
          label: "Produktion.",
        },
        {
          isCorrect: true,
          label: "Produktivität.",
        },
        {
          isCorrect: false,
          label: "Produzent.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "product.",
        },
        {
          isCorrect: false,
          label: "productive.",
        },
        {
          isCorrect: false,
          label: "production.",
        },
        {
          isCorrect: true,
          label: "productivity.",
        },
        {
          isCorrect: false,
          label: "producer.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "produk.",
        },
        {
          isCorrect: false,
          label: "produktif.",
        },
        {
          isCorrect: false,
          label: "produksi.",
        },
        {
          isCorrect: true,
          label: "produktivitas.",
        },
        {
          isCorrect: false,
          label: "produsen.",
        },
      ],
    },
  },
};

export default item;
