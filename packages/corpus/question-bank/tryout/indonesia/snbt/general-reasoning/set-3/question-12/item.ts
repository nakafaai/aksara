import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Penjualan kerudung jenis bergo selalu lebih tinggi dibandingkan penjualan kerudung jenis segiempat.",
        },
        {
          correct: false,
          label:
            "Penjualan kerudung jenis pasmina selalu lebih sedikit dibandingkan penjualan kerudung jenis segiempat.",
        },
        {
          correct: false,
          label:
            "Banyak penjualan kerudung jenis bergo mengikuti pola barisan aritmetika.",
        },
        {
          correct: false,
          label:
            "Tingkat penjualan jenis kerudung tiap minggu selalu lebih tinggi dibandingkan minggu sebelumnya.",
        },
        {
          correct: false,
          label:
            "Penjualan kerudung jenis bergo mengalami kenaikan paling kecil dari minggu ke-$$1$$ hingga minggu ke-$$4$$.",
        },
      ],
    },
  },
};

export default item;
