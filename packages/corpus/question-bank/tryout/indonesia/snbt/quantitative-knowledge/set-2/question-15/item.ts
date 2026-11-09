import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Luas segitiga $$ABC$$ adalah $$12$$ satuan luas.",
        },
        { column: 2, label: "Segitiga $$ABC$$ siku-siku di $$C$$." },
        { column: 1, label: "Panjang $$AC$$ adalah $$2\\sqrt5$$ satuan." },
        {
          column: 2,
          label: "Pusat lingkaran luar segitiga $$ABC$$ adalah $$(3,2)$$.",
        },
      ],
    },
  },
};

export default item;
