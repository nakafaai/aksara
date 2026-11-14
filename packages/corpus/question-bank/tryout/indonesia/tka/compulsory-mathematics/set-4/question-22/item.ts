import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "harian",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Median data tidak berubah.",
        },
        {
          correct: true,
          label: "Rata-rata data menjadi $$42$$ gelas.",
        },
        {
          correct: true,
          label: "Jangkauan data berkurang $$5$$ gelas.",
        },
        {
          correct: true,
          label: "Simpangan baku data menjadi $$4$$ gelas.",
        },
        {
          correct: true,
          label:
            "Penjualan paling sedikit setelah perbaikan berselisih lebih dari satu simpangan baku dari rata-rata yang baru.",
        },
      ],
    },
  },
};

export default item;
