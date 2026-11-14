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
          label: "Garis $$x+3y-15=0$$ menyinggung lingkaran $$L$$.",
        },
        {
          column: 2,
          label: "Titik $$(2,3)$$ terletak di dalam lingkaran $$L$$.",
        },
        {
          column: 2,
          label:
            "Lingkaran $$L$$ memotong sumbu $$Y$$ di dua titik yang berjarak $$4$$.",
        },
        {
          column: 1,
          label:
            "Lingkaran $$L$$ dan lingkaran $$x^2+y^2=25$$ berpotongan di dua titik.",
        },
      ],
    },
  },
};

export default item;
