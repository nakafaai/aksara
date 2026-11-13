import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Harga normal satu buku tulis pasti paling sedikit $$\\text{Rp}5{.}500$$.",
        },
        {
          column: 2,
          label:
            "Harga normal satu pulpen pasti kurang dari $$\\text{Rp}5{.}000$$.",
        },
        {
          column: 2,
          label:
            "Harga normal $$3$$ buku tulis dan $$2$$ pulpen pasti kurang dari $$\\text{Rp}35{.}000$$.",
        },
      ],
    },
  },
};

export default item;
