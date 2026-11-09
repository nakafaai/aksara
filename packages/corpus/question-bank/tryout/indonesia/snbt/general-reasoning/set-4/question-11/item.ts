import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "biconditional",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Rara membayar dengan kartu anggota.",
        },
        {
          column: 1,
          label: "Rara sudah mendaftar di aplikasi kafe.",
        },
        {
          column: 1,
          label: "Dimas tidak mendapat poin bonus.",
        },
        {
          column: 2,
          label:
            "Semua pelanggan yang sudah mendaftar di aplikasi kafe mendapat poin bonus.",
        },
        {
          column: 2,
          label:
            "Dimas membayar tanpa kartu anggota, tetapi tetap mendapat poin bonus.",
        },
      ],
    },
  },
};

export default item;
