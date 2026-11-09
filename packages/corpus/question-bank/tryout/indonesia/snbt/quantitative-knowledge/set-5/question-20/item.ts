import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Rata-rata banyak pengunjung per hari adalah $$150$$.",
        },
        {
          column: 1,
          label:
            "Kenaikan terbesar dari satu hari ke hari berikutnya terjadi dari Rabu ke Kamis.",
        },
        {
          column: 2,
          label: "Median banyak pengunjung lebih besar daripada rata-ratanya.",
        },
        {
          column: 2,
          label: "Banyak pengunjung naik $$30\\%$$ dari Senin ke Selasa.",
        },
      ],
    },
  },
};

export default item;
