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
          label: "Titik $$P(8,4)$$ terletak di luar lingkaran $$L$$.",
        },
        {
          column: 2,
          label:
            "Panjang garis singgung dari $$P(8,4)$$ ke lingkaran $$L$$ adalah $$24$$.",
        },
        {
          column: 1,
          label:
            "Garis singgung lingkaran $$L$$ di titik asal adalah $$3x+y=0$$.",
        },
        {
          column: 2,
          label: "Lingkaran $$L$$ menyinggung sumbu $$X$$.",
        },
      ],
    },
  },
};

export default item;
