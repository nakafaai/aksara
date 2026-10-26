import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "sequences-series",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "$$u_3=18$$",
        },
        {
          column: 1,
          label: "$$u_4=-54$$",
        },
        {
          column: 1,
          label: "$$S_5=122$$",
        },
        {
          column: 2,
          label: "$$u_6=486$$",
        },
      ],
    },
  },
};

export default item;
