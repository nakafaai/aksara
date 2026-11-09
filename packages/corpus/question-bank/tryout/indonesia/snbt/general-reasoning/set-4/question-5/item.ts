import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "inductive-reasoning",
    topic: "data-comparison",
  },
  stimulus: "cabai",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Harga rata-rata pada minggu ke-$$3$$ sepertiga lebih tinggi daripada harga pada minggu ke-$$1$$.",
        },
        {
          column: 1,
          label:
            "Pasokan pada minggu ke-$$6$$ lebih dari $$1{,}5$$ kali pasokan pada minggu ke-$$3$$.",
        },
        {
          column: 2,
          label:
            "Rata-rata harga selama enam minggu lebih dari $$\\text{Rp}33{.}000$$ per kg.",
        },
        {
          column: 2,
          label:
            "Penurunan harga terbesar dari satu minggu ke minggu berikutnya terjadi antara minggu ke-$$3$$ dan minggu ke-$$4$$.",
        },
      ],
    },
  },
};

export default item;
