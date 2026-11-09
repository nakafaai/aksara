import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "categorical-syllogism",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Dimas boleh bertugas di posko.",
        },
        {
          column: 2,
          label: "Dimas adalah tenaga kesehatan.",
        },
        {
          column: 1,
          label:
            "Sebagian relawan yang boleh bertugas di posko tidak bertugas di dapur umum.",
        },
        {
          column: 1,
          label:
            "Jika Dimas bertugas di dapur umum, Dimas bukan tenaga kesehatan.",
        },
        {
          column: 2,
          label:
            "Semua relawan yang boleh bertugas di posko telah lolos pelatihan dasar.",
        },
      ],
    },
  },
};

export default item;
