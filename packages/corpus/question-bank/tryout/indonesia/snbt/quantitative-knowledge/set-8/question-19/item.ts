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
            "Jumlah $$5$$ suku pertama barisan itu adalah $$-\\dfrac{33}{2}$$.",
        },
        {
          column: 2,
          label: "Barisan itu pasti mempunyai jumlah tak hingga.",
        },
        {
          column: 2,
          label:
            "Ada barisan yang memenuhi kedua syarat itu dengan rasio positif.",
        },
        {
          column: 2,
          label:
            "Ada barisan yang memenuhi kedua syarat itu dengan suku ke-$$7$$ bernilai positif.",
        },
      ],
    },
  },
};

export default item;
