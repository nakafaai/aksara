import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "data-interpretation",
  },
  stimulus: "night-watch",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Laporan pencurian terus turun setiap bulan dari Januari sampai Mei.",
        },
        {
          column: 1,
          label: "Banyak warga yang ikut ronda paling tinggi pada bulan Mei.",
        },
        {
          column: 1,
          label:
            "Kenaikan banyak warga yang ikut ronda paling besar terjadi dari Februari ke Maret.",
        },
        {
          column: 2,
          label:
            "Pada bulan Januari, laporan pencurian lebih banyak daripada warga yang ikut ronda.",
        },
      ],
    },
  },
};

export default item;
