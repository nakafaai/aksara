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
          column: 2,
          label: "Ketiga sudut segitiga itu lancip.",
        },
        {
          column: 1,
          label: "Salah satu sudut segitiga itu besarnya $$60^\\circ$$.",
        },
        {
          column: 1,
          label:
            "Tinggi segitiga terhadap sisi yang panjangnya $$8$$ cm adalah $$\\frac{3}{2}\\sqrt{3}$$ cm.",
        },
      ],
    },
  },
};

export default item;
