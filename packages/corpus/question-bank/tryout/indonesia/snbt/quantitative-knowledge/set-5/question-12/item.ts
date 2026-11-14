import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Ada tepat $$2$$ nilai $$a$$ yang membuat garis $$g$$ dan garis $$h$$ tidak mempunyai titik persekutuan.",
        },
        {
          column: 1,
          label: "Untuk $$a=-\\tfrac25$$, garis $$g$$ tegak lurus garis $$h$$.",
        },
        {
          column: 2,
          label:
            "Untuk $$a=-3$$, jarak antara garis $$g$$ dan garis $$h$$ adalah $$\\dfrac{3}{\\sqrt{13}}$$.",
        },
        {
          column: 2,
          label:
            "Untuk setiap nilai $$a$$, jarak titik $$(0,0)$$ ke garis $$g$$ kurang dari $$3$$.",
        },
      ],
    },
  },
};

export default item;
