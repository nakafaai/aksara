import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        { column: 1, label: "$$k=7$$" },
        { column: 1, label: "$$p^2+q^2=22$$" },
        { column: 2, label: "$$\\dfrac{1}{p}+\\dfrac{1}{q}=\\dfrac{7}{6}$$" },
        { column: 2, label: "$$p^3+q^3=132$$" },
      ],
    },
  },
};

export default item;
