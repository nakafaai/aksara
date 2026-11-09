import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "arrangement",
  },
  stimulus: "loker",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Loker Fajar dan loker Eli berada di kolom yang sama.",
        },
        {
          column: 1,
          label: "Loker Caca dan loker Beni berada di baris yang berbeda.",
        },
        {
          column: 2,
          label: "Loker Doni berada di kolom $$3$$.",
        },
        {
          column: 2,
          label: "Loker Eli berada di baris yang sama dengan loker Ana.",
        },
      ],
    },
  },
};

export default item;
