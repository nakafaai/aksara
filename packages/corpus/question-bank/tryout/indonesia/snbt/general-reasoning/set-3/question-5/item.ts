import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "inductive-reasoning",
    topic: "data-comparison",
  },
  stimulus: "kipas",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Penjualan kipas angin pada bulan April lebih dari dua kali penjualan pada bulan Januari.",
        },
        {
          column: 1,
          label:
            "Bulan dengan rata-rata suhu maksimum tertinggi juga merupakan bulan dengan penjualan kipas angin tertinggi.",
        },
        {
          column: 2,
          label:
            "Rata-rata pengunjung kolam renang per bulan untuk keenam bulan dalam tabel lebih dari $$3{.}600$$ orang.",
        },
        {
          column: 2,
          label:
            "Penjualan kipas angin pada bulan Juni lebih rendah daripada penjualan pada bulan Maret.",
        },
      ],
    },
  },
};

export default item;
