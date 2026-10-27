import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Banyak kerudung jenis bergo yang terjual adalah $$24$$ buah.",
        },
        {
          correct: true,
          label:
            "Penjualan jenis kerudung segiempat adalah sebanyak $$42$$ buah.",
        },
        {
          correct: false,
          label:
            "Kerudung jenis pasmina paling banyak terjual yaitu sebesar $$35$$ buah.",
        },
        {
          correct: false,
          label:
            "Kerudung jenis pasmina lebih sedikit terjual dibandingkan kerudung jenis bergo.",
        },
        {
          correct: false,
          label:
            "Kerudung jenis bergo adalah kerudung yang paling banyak terjual.",
        },
      ],
    },
  },
};

export default item;
