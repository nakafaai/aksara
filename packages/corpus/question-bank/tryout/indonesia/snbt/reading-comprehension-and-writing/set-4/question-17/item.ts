import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "data-interpretation",
  },
  stimulus: "water-tank",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Pada setiap bulan, pemakaian air rumah dengan tandon lebih rendah daripada rumah tanpa tandon.",
        },
        {
          column: 1,
          label:
            "Pemakaian air rumah tanpa tandon paling tinggi pada bulan Februari.",
        },
        {
          column: 2,
          label:
            "Pemakaian air rumah dengan tandon terus naik dari Januari sampai April.",
        },
        {
          column: 2,
          label:
            "Pada bulan Maret, pemakaian air rumah dengan tandon setengah dari pemakaian rumah tanpa tandon.",
        },
      ],
    },
  },
};

export default item;
