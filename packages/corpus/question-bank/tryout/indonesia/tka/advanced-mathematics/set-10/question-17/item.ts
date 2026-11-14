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
          label: "Jari-jari lingkaran $$L$$ adalah $$7$$.",
        },
        {
          column: 2,
          label:
            "Salah satu titik potong lingkaran $$L$$ dengan sumbu $$Y$$ adalah $$(0,3)$$.",
        },
        {
          column: 1,
          label:
            "Ruas garis dari titik asal ke titik $$(-8,6)$$ adalah diameter lingkaran $$L$$.",
        },
        {
          column: 1,
          label:
            "Salah satu titik potong lingkaran $$L$$ dengan sumbu $$X$$ adalah $$(-8,0)$$.",
        },
      ],
    },
  },
};

export default item;
