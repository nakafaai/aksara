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
          correct: true,
          label: "$$(-5,12)$$",
        },
        {
          correct: false,
          label: "$$\\left(1,\\frac32\\right)$$",
        },
        {
          correct: false,
          label: "$$(-3,2)$$",
        },
        {
          correct: false,
          label: "$$(5,-12)$$",
        },
        {
          correct: false,
          label: "$$(2,3)$$",
        },
      ],
    },
  },
};

export default item;
