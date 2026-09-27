import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Jumlah penjualan baju dan celana kurang dari $$70$$",
        },
        {
          isCorrect: false,
          label: "Penjualan celana $$10$$ lebih sedikit dari baju",
        },
        {
          isCorrect: false,
          label: "Penjualan jas $$35$$ lebih banyak dari celana",
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
