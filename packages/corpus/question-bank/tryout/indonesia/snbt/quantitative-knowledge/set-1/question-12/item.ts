import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        { column: 1, label: "Jangkauan data itu bisa sama dengan $$30$$." },
        {
          column: 2,
          label: "Jangkauan data itu tidak mungkin kurang dari $$6$$.",
        },
        { column: 1, label: "Data terbesar pasti lebih dari $$12$$." },
        {
          column: 1,
          label:
            "Jika tepat dua data bernilai $$8$$, jangkauan data itu paling sedikit $$7$$.",
        },
      ],
    },
  },
};

export default item;
