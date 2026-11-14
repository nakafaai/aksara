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
          label: "$$\\angle ABC=70^\\circ$$",
        },
        {
          column: 1,
          label: "$$AD$$ tegak lurus $$BC$$.",
        },
        {
          column: 2,
          label: "$$\\angle BAD=40^\\circ$$",
        },
        {
          column: 1,
          label: "Segitiga $$ABD$$ dan segitiga $$ACD$$ kongruen.",
        },
      ],
    },
  },
};

export default item;
