import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        { column: 1, label: "$$a=5$$" },
        { column: 2, label: "$$p(2)=12$$" },
        { column: 1, label: "$$x$$ merupakan faktor dari $$p(x)$$." },
        {
          column: 2,
          label: "Sisa pembagian $$p(x)$$ oleh $$x^2-1$$ adalah $$6x+2$$.",
        },
      ],
    },
  },
};

export default item;
