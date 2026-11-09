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
          correct: true,
          label: "$$(0,5)$$",
        },
        {
          correct: false,
          label: "$$(1,4)$$",
        },
        {
          correct: false,
          label: "$$(0,4)$$",
        },
        {
          correct: false,
          label: "$$(2,3)$$",
        },
        {
          correct: false,
          label: "$$(0,-3)$$",
        },
      ],
    },
  },
};

export default item;
