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
          label: "Keliling belah ketupat $$ABCD$$ adalah $$40\\text{ cm}$$.",
        },
        {
          column: 2,
          label: "Luas belah ketupat $$ABCD$$ adalah $$192\\text{ cm}^2$$.",
        },
        {
          column: 1,
          label:
            "Jarak antara sisi $$AB$$ dan sisi $$CD$$ adalah $$9{,}6\\text{ cm}$$.",
        },
        {
          column: 2,
          label: "Besar $$\\angle BAD$$ lebih dari $$90^\\circ$$.",
        },
      ],
    },
  },
};

export default item;
