import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Panjang $$DE$$ sama dengan panjang $$DF$$.",
        },
        {
          column: 1,
          label: "Luas segitiga $$DEF$$ adalah $$37{,}5\\text{ cm}^2$$.",
        },
        {
          column: 2,
          label: "Segitiga $$DEF$$ siku-siku di $$E$$.",
        },
        {
          column: 1,
          label: "Keliling segitiga $$DEF$$ kurang dari $$30\\text{ cm}$$.",
        },
      ],
    },
  },
};

export default item;
