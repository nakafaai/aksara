import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "circles",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Lingkaran $$L_1$$ dan $$L_2$$ bersinggungan di luar.",
        },
        {
          column: 1,
          label: "Titik singgung kedua lingkaran adalah $$(3,0)$$.",
        },
        {
          column: 2,
          label:
            "Seluruhnya ada tepat dua garis yang menyinggung kedua lingkaran sekaligus.",
        },
        {
          column: 2,
          label: "Garis $$x=3$$ memotong lingkaran $$L_2$$ di dua titik.",
        },
      ],
    },
  },
};

export default item;
