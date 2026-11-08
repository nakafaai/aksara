import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "disjunctive-syllogism",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Lina mengikuti kategori cerpen.",
        },
        {
          column: 2,
          label: "Lina tampil pada hari Jumat.",
        },
        {
          column: 2,
          label:
            "Semua peserta yang tampil pada hari Jumat adalah peserta kategori puisi.",
        },
        {
          column: 1,
          label: "Lina mengirim naskah sebelum hari Kamis.",
        },
      ],
    },
  },
};

export default item;
