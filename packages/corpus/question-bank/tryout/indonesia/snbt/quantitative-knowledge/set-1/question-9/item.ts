import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Banyak faktor positif $$n$$ yang ganjil adalah $$8$$.",
        },
        { column: 1, label: "$$5n$$ merupakan bilangan kuadrat sempurna." },
        { column: 1, label: "Banyak faktor positif $$n$$ adalah $$30$$." },
        {
          column: 2,
          label:
            "Banyak faktor positif $$n$$ yang merupakan bilangan kuadrat sempurna adalah $$4$$.",
        },
      ],
    },
  },
};

export default item;
