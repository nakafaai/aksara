import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "geometric-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$(4,3)$$",
        },
        {
          correct: true,
          label: "$$(-2,-1)$$",
        },
        {
          correct: false,
          label: "$$(-2,-3)$$",
        },
        {
          correct: false,
          label: "$$(-3,-2)$$",
        },
        {
          correct: false,
          label: "$$(-1,4)$$",
        },
      ],
    },
  },
};

export default item;
