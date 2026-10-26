import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Jumlah penjualan baju dan celana kurang dari $$70$$",
        },
        {
          correct: false,
          label: "Penjualan celana $$10$$ lebih sedikit dari baju",
        },
        {
          correct: false,
          label: "Penjualan jas $$35$$ lebih banyak dari celana",
        },
        {
          correct: false,
          label: "Penjualan baju $$10$$ lebih banyak dari celana",
        },
        {
          correct: false,
          label: "Penjualan celana $$35$$ lebih sedikit dari jas",
        },
      ],
    },
  },
};

export default item;
