import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Ekspor pakaian jadi Indonesia ke Amerika Serikat turun $$9{,}2\\%$$.",
        },
        {
          isCorrect: false,
          label: "Jepang merupakan pasar utama produk pakaian jadi Indonesia.",
        },
        {
          isCorrect: false,
          label:
            "Amerika Serikat dan Jerman merupakan dua negara dengan nilai ekspor tertinggi.",
        },
        {
          isCorrect: true,
          label:
            "Pasar utama produk pakaian jadi Indonesia pada $$2018$$ adalah Amerika Serikat.",
        },
        {
          isCorrect: false,
          label:
            "Nilai ekspor pakaian jadi Indonesia ke Amerika Serikat lebih sedikit daripada tahun lalu.",
        },
      ],
    },
  },
};

export default item;
