import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$(-10,-2)$$",
        },
        {
          correct: false,
          label: "$$(-6,0)$$",
        },
        {
          correct: true,
          label: "$$(-4,1)$$",
        },
        {
          correct: false,
          label: "$$\\left(\\frac{1}{2},1\\right)$$",
        },
        {
          correct: false,
          label: "$$(8,1)$$",
        },
      ],
    },
  },
};

export default item;
