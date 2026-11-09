import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "ordering",
  },
  stimulus: "urutan",
  versions: {
    id: {
      columns: ["Mungkin", "Tidak mungkin"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "T, R, U, S, P, Q",
        },
        {
          column: 1,
          label: "P, Q, R, S, U, T",
        },
        {
          column: 2,
          label: "T, P, Q, S, R, U",
        },
        {
          column: 1,
          label: "R, P, Q, U, S, T",
        },
      ],
    },
  },
};

export default item;
