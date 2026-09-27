import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Seluruh $$120$$ bibit tomat bertahan hidup selama bulan pertama.",
        },
        {
          isCorrect: false,
          label:
            "Seluruh $$96$$ bibit yang bertahan hidup menghasilkan daun baru.",
        },
        {
          isCorrect: false,
          label:
            "Laporan membuktikan bahwa bibit yang bertahan bebas dari penyakit.",
        },
        {
          isCorrect: false,
          label:
            "Bibit yang bertahan menghasilkan lebih banyak buah daripada bibit lainnya.",
        },
        {
          isCorrect: true,
          label:
            "Sebanyak $$72$$ bibit yang bertahan hidup menghasilkan daun baru.",
        },
      ],
    },
  },
};

export default item;
