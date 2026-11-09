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
          label:
            "Tidak ada pemain gamelan di Sanggar Laras yang berusia di bawah $$10$$ tahun.",
        },
        {
          column: 1,
          label:
            "Sebagian penari di Sanggar Laras berusia $$10$$ tahun atau lebih.",
        },
        {
          column: 2,
          label:
            "Semua penari di Sanggar Laras dapat membaca notasi kepatihan.",
        },
        {
          column: 2,
          label:
            "Semua anggota sanggar yang dapat membaca notasi kepatihan adalah pemain gamelan.",
        },
      ],
    },
  },
};

export default item;
