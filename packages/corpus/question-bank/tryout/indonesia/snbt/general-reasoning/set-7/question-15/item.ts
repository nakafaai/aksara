import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Seluruh $$120$$ bibit tomat bertahan hidup selama bulan pertama.",
        },
        {
          correct: false,
          label:
            "Seluruh $$96$$ bibit yang bertahan hidup menghasilkan daun baru.",
        },
        {
          correct: false,
          label:
            "Laporan membuktikan bahwa bibit yang bertahan bebas dari penyakit.",
        },
        {
          correct: false,
          label:
            "Bibit yang bertahan menghasilkan lebih banyak buah daripada bibit lainnya.",
        },
        {
          correct: true,
          label:
            "Sebanyak $$72$$ bibit yang bertahan hidup menghasilkan daun baru.",
        },
      ],
    },
  },
};

export default item;
