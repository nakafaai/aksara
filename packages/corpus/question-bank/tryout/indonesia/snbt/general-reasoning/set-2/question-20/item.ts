import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Ekspor pakaian jadi Indonesia ke Amerika Serikat turun $$9{,}2\\%$$.",
        },
        {
          correct: false,
          label: "Jepang merupakan pasar utama produk pakaian jadi Indonesia.",
        },
        {
          correct: false,
          label:
            "Amerika Serikat dan Jerman merupakan dua negara dengan nilai ekspor tertinggi.",
        },
        {
          correct: true,
          label:
            "Pasar utama produk pakaian jadi Indonesia pada $$2018$$ adalah Amerika Serikat.",
        },
        {
          correct: false,
          label:
            "Nilai ekspor pakaian jadi Indonesia ke Amerika Serikat lebih sedikit daripada tahun lalu.",
        },
      ],
    },
  },
};

export default item;
