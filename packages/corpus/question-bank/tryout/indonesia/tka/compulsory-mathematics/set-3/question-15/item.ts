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
          label: "$$(-1,-2)$$",
        },
        {
          correct: false,
          label: "$$(0,-3)$$",
        },
        {
          correct: true,
          label: "$$(0,5)$$",
        },
        {
          correct: false,
          label: "$$(4,5)$$",
        },
        {
          correct: false,
          label: "$$(12,-1)$$",
        },
      ],
    },
  },
};

export default item;
