import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$(-12,1)$$",
        },
        {
          correct: false,
          label: "$$(-11,-6)$$",
        },
        {
          correct: false,
          label: "$$(-9,5)$$",
        },
        {
          correct: false,
          label: "$$(-4,3)$$",
        },
        {
          correct: false,
          label: "$$(1,10)$$",
        },
      ],
    },
  },
};

export default item;
