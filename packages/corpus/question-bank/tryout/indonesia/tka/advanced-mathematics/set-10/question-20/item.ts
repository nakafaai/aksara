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
          label: "$$(0,0)$$",
        },
        {
          correct: false,
          label: "$$(2,3)$$",
        },
        {
          correct: false,
          label: "$$(5,6)$$",
        },
        {
          correct: true,
          label: "$$(-1,0)$$",
        },
        {
          correct: false,
          label: "$$(1,0)$$",
        },
      ],
    },
  },
};

export default item;
