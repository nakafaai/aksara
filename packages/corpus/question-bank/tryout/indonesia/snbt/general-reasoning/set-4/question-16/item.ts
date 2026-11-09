import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "scheduling",
  },
  stimulus: "pentas",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "U tidak tampil pada hari Jumat.",
        },
        {
          column: 2,
          label: "T tampil pada sesi sore.",
        },
        {
          column: 2,
          label: "S tampil pada hari Minggu.",
        },
        {
          column: 1,
          label: "Jika Q tampil pada hari Jumat, U tampil pada hari Minggu.",
        },
      ],
    },
  },
};

export default item;
