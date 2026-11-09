import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "inductive-reasoning",
    topic: "data-comparison",
  },
  stimulus: "antrean",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Pada bulan Mei, lebih dari separuh pasien datang pukul 09.00 atau sesudahnya.",
        },
        {
          column: 2,
          label:
            "Waktu tunggu pada setiap rentang jam kedatangan turun dari Maret ke Mei.",
        },
        {
          column: 1,
          label:
            "Banyak pasien per hari pada bulan Mei $$10$$ orang lebih banyak daripada bulan Maret.",
        },
        {
          column: 2,
          label:
            "Pada bulan Mei, waktu tunggu terlama terjadi pada rentang 07.00 sampai 08.00.",
        },
      ],
    },
  },
};

export default item;
