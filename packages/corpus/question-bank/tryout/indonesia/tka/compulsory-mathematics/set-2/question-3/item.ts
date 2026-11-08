import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "$$a^2>b^2$$",
        },
        {
          column: 1,
          label: "$$\\frac1a>\\frac1b$$",
        },
        {
          column: 2,
          label: "$$a-b>0$$",
        },
        {
          column: 2,
          label: "$$ab<b^2$$",
        },
      ],
    },
  },
};

export default item;
