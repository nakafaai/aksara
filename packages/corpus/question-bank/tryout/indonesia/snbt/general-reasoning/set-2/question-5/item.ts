import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "inductive-reasoning",
    topic: "data-comparison",
  },
  stimulus: "museum",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Banyak pengunjung dalam satu minggu naik lebih dari $$5\\%$$.",
        },
        {
          column: 1,
          label:
            "Jumlah penurunan pengunjung pada hari-hari selain Rabu lebih dari $$150$$ orang per minggu.",
        },
        {
          column: 2,
          label:
            "Pendapatan tiket mingguan pada bulan kedua lebih besar daripada pada bulan pertama.",
        },
        {
          column: 2,
          label:
            "Pada bulan kedua, pengunjung hari Rabu lebih banyak daripada pengunjung hari Sabtu.",
        },
      ],
    },
  },
};

export default item;
