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
          correct: false,
          label: "$$(9,6)$$",
        },
        {
          correct: true,
          label: "$$(1,2)$$",
        },
        {
          correct: false,
          label: "$$\\left(0,\\tfrac{3}{2}\\right)$$",
        },
        {
          correct: false,
          label: "$$(-1,1)$$",
        },
        {
          correct: false,
          label: "$$(-1,-2)$$",
        },
      ],
    },
  },
};

export default item;
