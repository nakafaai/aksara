import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "cost-comparison",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Untuk pemakaian $$15$$ GB dalam sebulan, Paket A lebih murah daripada Paket B.",
        },
        {
          column: 1,
          label:
            "Untuk pemakaian $$12$$ GB dalam sebulan, Paket A lebih murah daripada Paket B.",
        },
        {
          column: 2,
          label:
            "Untuk pemakaian $$25$$ GB dalam sebulan, selisih biaya kedua paket adalah $$\\text{Rp}10{.}000$$.",
        },
        {
          column: 1,
          label:
            "Untuk setiap pemakaian lebih dari $$15$$ GB dalam sebulan, Paket B lebih murah daripada Paket A.",
        },
      ],
    },
  },
};

export default item;
