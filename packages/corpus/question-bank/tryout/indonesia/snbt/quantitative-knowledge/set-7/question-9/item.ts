import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "$$n^3-n$$ habis dibagi $$6$$ untuk setiap bilangan bulat $$n$$.",
        },
        {
          column: 2,
          label:
            "$$n^3-n$$ habis dibagi $$4$$ untuk setiap bilangan bulat $$n$$.",
        },
        {
          column: 1,
          label: "Jika $$n$$ ganjil, $$n^3-n$$ habis dibagi $$24$$.",
        },
        {
          column: 2,
          label:
            "$$n^3-n$$ habis dibagi $$5$$ untuk setiap bilangan bulat $$n$$.",
        },
      ],
    },
  },
};

export default item;
