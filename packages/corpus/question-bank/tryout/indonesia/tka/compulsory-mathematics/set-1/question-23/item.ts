import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "coffee-sales",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Rata-rata penjualan per hari naik dibandingkan data $$30$$ hari.",
        },
        {
          correct: true,
          label: "Median penjualan tetap $$50$$ gelas.",
        },
        {
          correct: false,
          label: "Modus data hanya $$60$$ gelas.",
        },
        {
          correct: true,
          label: "Jangkauan data tidak berubah.",
        },
        {
          correct: false,
          label: "Rata-rata penjualan per hari lebih dari $$52$$ gelas.",
        },
      ],
    },
  },
};

export default item;
