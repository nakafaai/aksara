import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        { column: 1, label: "$$\\sqrt{x}=1+\\sqrt2$$" },
        { column: 1, label: "$$x+\\dfrac{1}{x}=6$$" },
        { column: 2, label: "$$x^2+\\dfrac{1}{x^2}=36$$" },
        { column: 2, label: "$$\\dfrac{1}{x}=3+2\\sqrt2$$" },
      ],
    },
  },
};

export default item;
