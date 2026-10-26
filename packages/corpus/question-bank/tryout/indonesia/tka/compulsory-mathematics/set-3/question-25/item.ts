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
          label: "Peluang jumlah kedua dadu $$9$$ adalah $$\\frac19$$.",
        },
        {
          column: 1,
          label: "Peluang dadu merah lebih besar adalah $$\\frac5{12}$$.",
        },
        {
          column: 1,
          label:
            "Jika jumlahnya genap, peluang kedua dadu menunjukkan angka ganjil adalah $$\\frac12$$.",
        },
        {
          column: 1,
          label:
            "Kejadian dadu merah genap dan jumlah kedua dadu genap saling bebas.",
        },
        {
          column: 2,
          label:
            "Peluang sedikitnya satu dadu menunjukkan angka enam adalah $$\\frac13$$.",
        },
      ],
    },
  },
};

export default item;
