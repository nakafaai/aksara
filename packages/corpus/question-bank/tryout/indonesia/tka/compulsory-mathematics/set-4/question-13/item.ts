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
          label: "$$(-1,0)$$",
        },
        {
          correct: false,
          label: "$$(0,0)$$",
        },
        {
          correct: false,
          label: "$$\\left(\\frac12,-\\frac12\\right)$$",
        },
        {
          correct: false,
          label: "$$(2,1)$$",
        },
        {
          correct: true,
          label: "$$(2,-1)$$",
        },
      ],
    },
  },
};

export default item;
