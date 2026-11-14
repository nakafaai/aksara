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
          column: 1,
          label:
            "Untuk setiap lama pemakaian lebih dari $$8$$ jam, biaya di Ruang Q lebih kecil daripada biaya di Ruang P.",
        },
        {
          column: 2,
          label:
            "Biaya memakai Ruang P selama $$5$$ jam $$10$$ menit kurang dari $$\\text{Rp}50{.}000$$.",
        },
        {
          column: 2,
          label:
            "Untuk setiap lama pemakaian kurang dari $$4$$ jam, biaya di Ruang Q lebih kecil daripada biaya di Ruang P.",
        },
        {
          column: 1,
          label:
            "Ada lama pemakaian antara $$7$$ jam dan $$8$$ jam yang membuat biaya di kedua ruang sama besar.",
        },
      ],
    },
  },
};

export default item;
