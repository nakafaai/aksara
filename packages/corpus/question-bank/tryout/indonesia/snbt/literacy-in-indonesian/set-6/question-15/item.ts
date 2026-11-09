import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "fine-dust",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Angka tertinggi di kedua stasiun tercatat pada jam yang sama.",
        },
        {
          column: 1,
          label:
            "Pada setiap jam pengukuran, angka di Stasiun A lebih tinggi daripada di Stasiun B.",
        },
        {
          column: 1,
          label: "Selisih angka kedua stasiun paling kecil pada pukul 23.00.",
        },
        {
          column: 2,
          label:
            "Angka Stasiun B pada pukul 14.00 lebih kecil daripada angka 15 µg/m³ dalam pedoman WHO.",
        },
      ],
    },
  },
};

export default item;
