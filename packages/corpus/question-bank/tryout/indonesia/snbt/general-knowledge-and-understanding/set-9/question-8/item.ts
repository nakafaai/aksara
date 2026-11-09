import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "rabies",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Mencuci luka gigitan dengan sabun dan air mengalir termasuk langkah awal yang dianjurkan.",
        },
        {
          column: 2,
          label: "Rabies hanya dapat ditularkan oleh anjing.",
        },
        {
          column: 2,
          label:
            "Memvaksin tiga puluh persen anjing di suatu wilayah sudah cukup untuk menghentikan penularan.",
        },
        {
          column: 1,
          label:
            "Gejala rabies tidak selalu muncul segera setelah seseorang digigit.",
        },
      ],
    },
  },
};

export default item;
