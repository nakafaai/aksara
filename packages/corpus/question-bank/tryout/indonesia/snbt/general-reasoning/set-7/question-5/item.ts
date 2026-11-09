import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "inductive-reasoning",
    topic: "data-comparison",
  },
  stimulus: "klinik",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Kunjungan kucing pada bulan Maret lebih dari $$2{,}5$$ kali kunjungan kucing pada bulan Februari.",
        },
        {
          column: 2,
          label:
            "Rata-rata kunjungan anjing per bulan dari Januari sampai Juni lebih dari $$86$$.",
        },
        {
          column: 2,
          label:
            "Total kunjungan pada bulan Maret lebih dari dua kali total kunjungan pada bulan Februari.",
        },
        {
          column: 1,
          label:
            "Pada bulan Mei, kunjungan kucing masih lebih banyak daripada kunjungan kucing pada bulan Januari.",
        },
      ],
    },
  },
};

export default item;
