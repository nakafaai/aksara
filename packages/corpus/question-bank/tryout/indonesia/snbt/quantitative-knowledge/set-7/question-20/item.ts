import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Ada tiga keluarga yang pemakaian airnya turun dari Juli ke Agustus.",
        },
        {
          column: 2,
          label:
            "Kenaikan pemakaian air terbesar, dihitung dalam persen, dialami keluarga A.",
        },
        {
          column: 1,
          label:
            "Rata-rata pemakaian air bulan Agustus $$2\\text{ m}^3$$ lebih besar daripada rata-rata bulan Juli.",
        },
        {
          column: 1,
          label: "Median pemakaian air bulan Juli adalah $$18\\text{ m}^3$$.",
        },
      ],
    },
  },
};

export default item;
