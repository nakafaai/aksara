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
            "Untuk memperoleh $$4$$ kaus, Toko C adalah toko yang paling murah.",
        },
        {
          column: 1,
          label:
            "Untuk memperoleh $$8$$ kaus di Toko B, dua transaksi yang masing-masing berisi $$4$$ kaus lebih murah $$\\text{Rp}35{.}000$$ daripada satu transaksi berisi $$8$$ kaus.",
        },
        {
          column: 2,
          label:
            "Untuk memperoleh $$5$$ kaus, Toko A lebih murah daripada Toko C.",
        },
        {
          column: 2,
          label:
            "Untuk memperoleh $$6$$ kaus, Toko C lebih murah daripada Toko A karena $$1$$ kaus di antaranya gratis.",
        },
      ],
    },
  },
};

export default item;
