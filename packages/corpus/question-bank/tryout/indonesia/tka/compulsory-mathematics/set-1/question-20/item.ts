import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "$$\\angle BCD=106^\\circ$$",
        },
        {
          column: 2,
          label: "$$\\angle BOC=28^\\circ$$",
        },
        {
          column: 2,
          label: "$$\\angle BDC=46^\\circ$$",
        },
        {
          column: 1,
          label: "$$\\angle ADB=62^\\circ$$",
        },
      ],
    },
  },
};

export default item;
