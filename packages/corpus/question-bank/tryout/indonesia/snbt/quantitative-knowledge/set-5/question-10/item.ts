import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        { column: 1, label: "Gradien garis $$g$$ adalah $$\\tfrac23$$." },
        {
          column: 2,
          label: "Garis $$h$$ memotong sumbu $$x$$ di titik $$(6,0)$$.",
        },
        {
          column: 2,
          label: "Garis $$g$$ dan garis $$h$$ berpotongan di kuadran I.",
        },
        {
          column: 1,
          label:
            "Luas segitiga yang dibatasi garis $$g$$, sumbu $$x$$, dan sumbu $$y$$ adalah $$3$$ satuan luas.",
        },
      ],
    },
  },
};

export default item;
