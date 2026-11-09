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
          column: 2,
          label: "Garis $$3x+4y+14=0$$ memotong lingkaran $$L$$ di dua titik.",
        },
        {
          column: 1,
          label: "Titik $$(4,6)$$ terletak pada lingkaran $$L$$.",
        },
        {
          column: 2,
          label:
            "Lingkaran $$L$$ memotong sumbu $$X$$ di dua titik yang berjarak $$8$$.",
        },
        {
          column: 1,
          label:
            "Garis singgung $$L$$ di titik $$(4,6)$$ sejajar garis $$3x+4y=0$$.",
        },
      ],
    },
  },
};

export default item;
