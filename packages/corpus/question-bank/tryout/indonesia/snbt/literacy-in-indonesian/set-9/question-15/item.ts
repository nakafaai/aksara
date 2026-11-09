import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "water-stunting",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Desa dengan akses air minum layak tertinggi memiliki persentase balita stunting terendah.",
        },
        {
          column: 2,
          label: "Jumlah balita stunting terbanyak terdapat di Wonosari.",
        },
        {
          column: 2,
          label:
            "Kurang dari separuh rumah tangga di Tanjungrejo memiliki air minum layak.",
        },
        {
          column: 1,
          label:
            "Jumlah balita stunting di Karangsari dua kali jumlah balita stunting di Sukamaju.",
        },
      ],
    },
  },
};

export default item;
