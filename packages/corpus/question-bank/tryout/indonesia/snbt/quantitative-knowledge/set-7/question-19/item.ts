import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        { column: 1, label: "$$ab<0$$" },
        { column: 1, label: "$$a-b+c<0$$" },
        { column: 2, label: "$$a+b+c>0$$" },
        {
          column: 1,
          label: "Fungsi $$f$$ mempunyai nilai maksimum, dan nilai maksimum itu positif.",
        },
      ],
    },
  },
};

export default item;
