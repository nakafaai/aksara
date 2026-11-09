import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "inductive-reasoning",
    topic: "data-comparison",
  },
  stimulus: "tangga",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Pada minggu ke-$$5$$, perjalanan naik tangga lebih dari $$30\\%$$ dari seluruh perjalanan.",
        },
        {
          column: 1,
          label:
            "Rata-rata perjalanan naik tangga per hari pada minggu ke-$$1$$ sampai ke-$$4$$ adalah $$305$$.",
        },
        {
          column: 1,
          label:
            "Perjalanan naik tangga pada minggu ke-$$8$$ masih lebih dari $$20\\%$$ di atas rata-rata minggu ke-$$1$$ sampai ke-$$4$$.",
        },
        {
          column: 2,
          label:
            "Penurunan perjalanan naik lift dari minggu ke-$$4$$ ke minggu ke-$$5$$ sama dengan kenaikan perjalanan naik tangga pada minggu yang sama.",
        },
      ],
    },
  },
};

export default item;
