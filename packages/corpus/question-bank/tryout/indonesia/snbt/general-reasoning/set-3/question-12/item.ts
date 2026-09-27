import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Penjualan kerudung jenis bergo selalu lebih tinggi dibandingkan penjualan kerudung jenis segiempat.",
        },
        {
          isCorrect: false,
          label:
            "Penjualan kerudung jenis pasmina selalu lebih sedikit dibandingkan penjualan kerudung jenis segiempat.",
        },
        {
          isCorrect: false,
          label:
            "Banyak penjualan kerudung jenis bergo mengikuti pola barisan aritmetika.",
        },
        {
          isCorrect: false,
          label:
            "Tingkat penjualan jenis kerudung tiap minggu selalu lebih tinggi dibandingkan minggu sebelumnya.",
        },
        {
          isCorrect: false,
          label:
            "Penjualan kerudung jenis bergo mengalami kenaikan paling kecil dari minggu ke-$$1$$ hingga minggu ke-$$4$$.",
        },
      ],
    },
  },
};

export default item;
