import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "geometric-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$(-3,3)$$",
        },
        {
          correct: false,
          label: "$$(15,-6)$$",
        },
        {
          correct: true,
          label: "$$(3,-3)$$",
        },
        {
          correct: false,
          label: "$$(5,1)$$",
        },
        {
          correct: false,
          label: "$$(3,3)$$",
        },
      ],
    },
  },
};

export default item;
