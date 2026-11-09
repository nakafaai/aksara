import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        { column: 2, label: "$$x-2>0$$" },
        { column: 1, label: "$$x^2<16$$" },
        { column: 2, label: "$$\\dfrac{1}{x}<\\dfrac{1}{4}$$" },
        { column: 1, label: "$$(x-1)(x-5)<0$$" },
      ],
    },
  },
};

export default item;
