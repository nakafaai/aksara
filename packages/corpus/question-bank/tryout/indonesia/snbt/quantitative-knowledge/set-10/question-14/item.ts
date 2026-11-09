import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Peluang terambil kartu bernomor bilangan prima adalah $$\\dfrac13$$.",
        },
        {
          column: 2,
          label:
            "Peluang terambil kartu bernomor bilangan kuadrat sempurna adalah $$\\dfrac15$$.",
        },
        {
          column: 1,
          label:
            "Peluang terambil kartu bernomor bilangan genap yang juga kelipatan 5 adalah $$\\dfrac{1}{10}$$.",
        },
        {
          column: 2,
          label:
            "Peluang terambil kartu bernomor bilangan ganjil yang lebih dari 20 adalah $$\\dfrac15$$.",
        },
      ],
    },
  },
};

export default item;
