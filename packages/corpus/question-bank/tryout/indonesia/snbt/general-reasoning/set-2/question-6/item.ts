import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Der Verkauf von Hosen ist $$10$$ geringer als der von Hemden",
        },
        {
          isCorrect: false,
          label: "Der Verkauf von Anzügen ist $$35$$ höher als der von Hosen",
        },
        {
          isCorrect: true,
          label: "Zusammen werden weniger als $$70$$ Hemden und Hosen verkauft",
        },
        {
          isCorrect: false,
          label: "Der Verkauf von Hemden ist $$10$$ höher als der von Hosen",
        },
        {
          isCorrect: false,
          label:
            "Der Verkauf von Hosen ist $$35$$ geringer als der von Anzügen",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Pants sales are $$10$$ fewer than shirts",
        },
        {
          isCorrect: false,
          label: "Suits sales are $$35$$ more than pants",
        },
        {
          isCorrect: true,
          label:
            "The combined number of shirts and pants sold is less than $$70$$",
        },
        {
          isCorrect: false,
          label: "Shirts sales are $$10$$ more than pants",
        },
        {
          isCorrect: false,
          label: "Pants sales are $$35$$ less than suits",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Penjualan celana $$10$$ lebih sedikit dari baju",
        },
        {
          isCorrect: false,
          label: "Penjualan jas $$35$$ lebih banyak dari celana",
        },
        {
          isCorrect: true,
          label: "Jumlah penjualan baju dan celana kurang dari $$70$$",
        },
        {
          isCorrect: false,
          label: "Penjualan baju $$10$$ lebih banyak dari celana",
        },
        {
          isCorrect: false,
          label: "Penjualan celana $$35$$ lebih sedikit dari jas",
        },
      ],
    },
  },
};

export default item;
