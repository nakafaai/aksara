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
          label: "$$AD=6{,}4\\text{ cm}$$",
        },
        {
          column: 1,
          label: "$$CD=4{,}8\\text{ cm}$$",
        },
        {
          column: 2,
          label: "Keliling segitiga $$BCD$$ adalah $$18\\text{ cm}$$.",
        },
        {
          column: 1,
          label:
            "Perbandingan luas segitiga $$ACD$$ dan luas segitiga $$BCD$$ adalah $$9:16$$.",
        },
      ],
    },
  },
};

export default item;
