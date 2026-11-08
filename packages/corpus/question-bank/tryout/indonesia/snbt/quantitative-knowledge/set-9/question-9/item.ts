import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        { column: 1, label: "$$a+b$$ adalah bilangan ganjil." },
        { column: 2, label: "$$ab$$ adalah bilangan ganjil." },
        { column: 1, label: "$$a^2-b^2$$ adalah bilangan ganjil." },
        { column: 2, label: "$$a^2+b^2$$ habis dibagi 4." },
      ],
    },
  },
};

export default item;
