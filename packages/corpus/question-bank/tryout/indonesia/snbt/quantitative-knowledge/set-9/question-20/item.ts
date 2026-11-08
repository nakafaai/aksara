import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Pendapatan Toko P naik $$50\\%$$ dari Maret ke April.",
        },
        {
          column: 2,
          label:
            "Rata-rata pendapatan bulanan Toko Q selama lima bulan itu adalah 25 juta rupiah.",
        },
        {
          column: 1,
          label:
            "Ada tepat dua bulan ketika pendapatan Toko P lebih besar daripada pendapatan Toko Q.",
        },
        {
          column: 1,
          label:
            "Total pendapatan Toko Q selama lima bulan itu lebih besar daripada total pendapatan Toko P.",
        },
      ],
    },
  },
};

export default item;
