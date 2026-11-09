import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "inductive-reasoning",
    topic: "inference",
  },
  stimulus: "pasar",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Jumlah pengunjung kedua pasar bersama-sama naik 300 orang.",
        },
        {
          column: 2,
          label: "Jumlah pengunjung Pasar Kenari naik setelah renovasi.",
        },
        {
          column: 2,
          label: "Pengunjung Pasar Cendana naik lebih dari dua kali lipat.",
        },
        {
          column: 1,
          label: "Pengunjung Pasar Kenari turun 20%.",
        },
      ],
    },
  },
};

export default item;
