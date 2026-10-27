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
          label: "$$u_4=54$$",
        },
        {
          column: 1,
          label: "$$S_4=80$$",
        },
        {
          column: 2,
          label: "$$u_6=243$$",
        },
        {
          column: 1,
          label: "$$\\frac{u_6}{u_3}=27$$",
        },
      ],
    },
  },
};

export default item;
