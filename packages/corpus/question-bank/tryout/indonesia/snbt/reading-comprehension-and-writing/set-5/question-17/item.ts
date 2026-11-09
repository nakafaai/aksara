import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "data-interpretation",
  },
  stimulus: "seed-soak",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Biji yang direndam 6 jam lebih banyak berkecambah daripada biji yang tidak direndam.",
        },
        {
          column: 2,
          label:
            "Makin lama biji direndam, makin banyak biji yang berkecambah.",
        },
        {
          column: 2,
          label:
            "Kelompok yang direndam 24 jam menghasilkan kecambah paling sedikit.",
        },
        {
          column: 1,
          label: "Pada setiap kelompok, lebih dari separuh biji berkecambah.",
        },
      ],
    },
  },
};

export default item;
