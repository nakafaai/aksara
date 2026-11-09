import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        { column: 1, label: "Rasio barisan tersebut adalah $$\\tfrac12$$." },
        {
          column: 2,
          label:
            "Jumlah semua suku barisan tersebut sampai tak hingga adalah $$64$$.",
        },
        {
          column: 1,
          label: "Jumlah lima suku pertama barisan tersebut adalah $$93$$.",
        },
        { column: 2, label: "Suku keenam barisan tersebut adalah $$3$$." },
      ],
    },
  },
};

export default item;
