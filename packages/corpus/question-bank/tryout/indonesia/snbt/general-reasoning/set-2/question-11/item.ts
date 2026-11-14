import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "quantifiers",
  },
  versions: {
    id: {
      columns: ["Pasti benar", "Tidak pasti benar"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Tidak ada stan penjual anyaman yang menerima pembayaran nontunai.",
        },
        {
          column: 1,
          label:
            "Sebagian stan di lantai dua tidak menerima pembayaran nontunai.",
        },
        {
          column: 1,
          label: "Sebagian stan penjual anyaman tidak menjual batik tulis.",
        },
        {
          column: 2,
          label: "Sebagian stan penjual batik tulis berada di lantai dua.",
        },
      ],
    },
  },
};

export default item;
