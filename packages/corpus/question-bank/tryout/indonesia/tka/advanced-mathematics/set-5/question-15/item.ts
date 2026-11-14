import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "circles",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$(3,0)$$",
        },
        {
          correct: false,
          label: "$$\\left(\\frac{25}{4},0\\right)$$",
        },
        {
          correct: false,
          label: "$$(5,0)$$",
        },
        {
          correct: true,
          label: "$$\\left(\\frac{25}{3},0\\right)$$",
        },
        {
          correct: false,
          label: "$$\\left(0,\\frac{25}{4}\\right)$$",
        },
      ],
    },
  },
};

export default item;
