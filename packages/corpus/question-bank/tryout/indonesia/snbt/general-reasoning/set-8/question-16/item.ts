import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "ordering",
  },
  stimulus: "lagu",
  versions: {
    id: {
      columns: ["Mungkin", "Tidak mungkin"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "P, S, R, T, Q, U",
        },
        {
          column: 1,
          label: "S, R, U, P, T, Q",
        },
        {
          column: 2,
          label: "S, R, T, U, P, Q",
        },
        {
          column: 2,
          label: "T, P, S, R, U, Q",
        },
      ],
    },
  },
};

export default item;
