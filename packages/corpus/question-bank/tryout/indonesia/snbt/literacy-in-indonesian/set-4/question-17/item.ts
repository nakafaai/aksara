import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "dengue-cases",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kenaikan itu hanya $$30$$ kasus tambahan, sehingga laju kasus Sukamulya pada 2024 sebenarnya yang terendah di kabupaten.",
        },
        {
          correct: false,
          label:
            "Kasus Kota Baru bertambah $$40$$, lebih banyak daripada Sukamulya, sehingga penularan paling cepat sebenarnya terjadi di Kota Baru.",
        },
        {
          correct: true,
          label:
            "Kenaikan itu hanya $$30$$ kasus tambahan, tetapi laju Sukamulya pada 2024 termasuk yang tertinggi, sehingga kenaikannya tetap patut diperhatikan walaupun persentasenya membesar karena jumlah awalnya kecil.",
        },
        {
          correct: false,
          label:
            "Kenaikan itu hanya $$30$$ kasus tambahan, tetapi laju Sukamulya pada 2024 adalah yang tertinggi di kabupaten, sehingga sebutan menyebar paling cepat tetap tepat.",
        },
        {
          correct: false,
          label:
            "Kasus di luar Kota Baru lebih sering tidak tercatat, sehingga kenaikan di Sukamulya pasti lebih kecil daripada yang tercatat.",
        },
      ],
    },
  },
};

export default item;
