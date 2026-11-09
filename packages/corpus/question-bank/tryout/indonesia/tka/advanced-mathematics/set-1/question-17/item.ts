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
          label: "Lingkaran $$L_1$$ dan $$L_2$$ berpotongan di dua titik.",
        },
        {
          column: 1,
          label:
            "Lingkaran $$L_1$$ dan $$L_2$$ bersinggungan di titik $$\\left(\\frac{12}{5},\\frac95\\right)$$.",
        },
        {
          column: 1,
          label:
            "Garis $$4x+3y=15$$ menyinggung lingkaran $$L_1$$ dan juga menyinggung lingkaran $$L_2$$.",
        },
        {
          column: 2,
          label: "Titik $$(0,3)$$ terletak di dalam lingkaran $$L_2$$.",
        },
      ],
    },
  },
};

export default item;
