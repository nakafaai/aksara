import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "inequality",
  },
  versions: {
    id: {
      columns: ["Pasti benar", "Tidak pasti benar"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "$$a+b>2$$",
        },
        {
          column: 2,
          label: "$$\\frac{a}{b}>a$$",
        },
        {
          column: 1,
          label: "$$a^2\\lt a$$",
        },
        {
          column: 1,
          label: "$$ab\\lt b$$",
        },
      ],
    },
  },
};

export default item;
