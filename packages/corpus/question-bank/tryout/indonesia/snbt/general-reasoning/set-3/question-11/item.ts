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
          label: "Sebagian lapak yang buka malam ini menjual minuman dingin.",
        },
        {
          column: 1,
          label:
            "Tidak ada lapak milik paguyuban pedagang yang menjual minuman dingin.",
        },
        {
          column: 1,
          label:
            "Sebagian lapak yang memakai lampu tenaga surya tidak berada di lorong utara.",
        },
        {
          column: 2,
          label:
            "Sebagian lapak yang buka malam ini tidak berada di lorong utara.",
        },
      ],
    },
  },
};

export default item;
