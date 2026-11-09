import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "number-properties",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Setiap bilangan seperti itu habis dibagi $$9$$.",
        },
        {
          column: 2,
          label: "Ada tepat $$10$$ bilangan seperti itu.",
        },
        {
          column: 2,
          label: "Bilangan terbesar seperti itu adalah $$99$$.",
        },
        {
          column: 1,
          label:
            "Jika kedua angka sebuah bilangan seperti itu ditukar letaknya, selisih bilangan baru dan bilangan semula selalu merupakan kelipatan $$9$$.",
        },
      ],
    },
  },
};

export default item;
