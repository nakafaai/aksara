import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "probability",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Peluang jumlah kedua angka ganjil adalah $$\\frac47$$.",
        },
        {
          column: 1,
          label: "Peluang kedua kartu bernomor prima adalah $$\\frac3{14}$$.",
        },
        {
          column: 1,
          label:
            "Jika kartu pertama genap, peluang kartu kedua ganjil adalah $$\\frac47$$.",
        },
        {
          column: 2,
          label:
            "Kejadian kartu pertama genap dan kartu kedua ganjil saling bebas.",
        },
        {
          column: 1,
          label:
            "Peluang angka yang lebih besar adalah $$8$$ sebesar $$\\frac14$$.",
        },
      ],
    },
  },
};

export default item;
