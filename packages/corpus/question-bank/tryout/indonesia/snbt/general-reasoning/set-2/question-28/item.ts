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
            "Bagi pembeli yang bukan anggota, harga per kilogram beras kemasan $$25\\text{ kg}$$ lebih murah daripada kemasan $$5\\text{ kg}$$.",
        },
        {
          column: 1,
          label:
            "Bagi anggota, membeli satu kemasan $$25\\text{ kg}$$ lebih murah $$\\text{Rp}52{.}000$$ daripada membeli lima kemasan $$5\\text{ kg}$$.",
        },
        {
          column: 2,
          label:
            "Bagi pembeli yang bukan anggota, cara paling murah untuk membeli tepat $$30\\text{ kg}$$ beras adalah membeli enam kemasan $$5\\text{ kg}$$.",
        },
        {
          column: 2,
          label:
            "Bagi anggota, harga per kilogram beras kemasan $$25\\text{ kg}$$ kurang dari $$\\text{Rp}11{.}000$$.",
        },
      ],
    },
  },
};

export default item;
