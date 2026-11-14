import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "grouping",
  },
  stimulus: "relawan",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Nanda dan Putri bertugas di pos yang sama.",
        },
        {
          column: 2,
          label: "Kurnia bertugas di pos medis.",
        },
        {
          column: 2,
          label: "Putri bertugas di pos logistik.",
        },
        {
          column: 1,
          label:
            "Jika Fikri bertugas di pos logistik, Kurnia bertugas di pos medis.",
        },
      ],
    },
  },
};

export default item;
