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
          label: "$$\\left(2,2\\sqrt3\\right)$$",
        },
        {
          correct: false,
          label: "$$\\left(-2,-2\\sqrt3\\right)$$",
        },
        {
          correct: true,
          label: "$$\\left(-2,2\\sqrt3\\right)$$",
        },
        {
          correct: false,
          label: "$$\\left(2\\sqrt3,-2\\right)$$",
        },
        {
          correct: false,
          label: "$$\\left(-2\\sqrt3,2\\right)$$",
        },
      ],
    },
  },
};

export default item;
