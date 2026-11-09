import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "quantitative-reasoning",
    topic: "data-interpretation",
  },
  stimulus: "mebel",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Stok pada akhir Juni lebih banyak daripada stok pada awal Januari.",
        },
        {
          column: 1,
          label:
            "Ada tepat tiga bulan ketika produksi lebih banyak daripada penjualan.",
        },
        {
          column: 2,
          label:
            "Total penjualan selama enam bulan lebih banyak daripada total produksi.",
        },
        {
          column: 2,
          label:
            "Penurunan stok terbesar dalam satu bulan terjadi pada bulan Juni.",
        },
      ],
    },
  },
};

export default item;
