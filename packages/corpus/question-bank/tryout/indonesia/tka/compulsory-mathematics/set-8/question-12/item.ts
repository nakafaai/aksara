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
          label: "Ada tepat $$11$$ nilai $$c$$ yang mungkin.",
        },
        {
          column: 2,
          label: "Segitiga itu tumpul untuk tepat $$4$$ nilai $$c$$.",
        },
        {
          column: 2,
          label:
            "Jika keliling segitiga itu bilangan genap, segitiga itu pasti lancip.",
        },
      ],
    },
  },
};

export default item;
