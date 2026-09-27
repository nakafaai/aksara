import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Banyak kerudung jenis bergo yang terjual adalah $$24$$ buah.",
        },
        {
          isCorrect: true,
          label:
            "Penjualan jenis kerudung segiempat adalah sebanyak $$42$$ buah.",
        },
        {
          isCorrect: false,
          label:
            "Kerudung jenis pasmina paling banyak terjual yaitu sebesar $$35$$ buah.",
        },
        {
          isCorrect: false,
          label:
            "Kerudung jenis pasmina lebih sedikit terjual dibandingkan kerudung jenis bergo.",
        },
        {
          isCorrect: false,
          label:
            "Kerudung jenis bergo adalah kerudung yang paling banyak terjual.",
        },
      ],
    },
  },
};

export default item;
