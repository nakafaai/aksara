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
          isCorrect: false,
          label: "Produzent.",
        },
        {
          isCorrect: true,
          label: "Produktivität.",
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
          isCorrect: false,
          label: "producer.",
        },
        {
          isCorrect: true,
          label: "productivity.",
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
          isCorrect: false,
          label: "produsen.",
        },
        {
          isCorrect: true,
          label: "produktivitas.",
        },
      ],
    },
  },
};

export default item;
