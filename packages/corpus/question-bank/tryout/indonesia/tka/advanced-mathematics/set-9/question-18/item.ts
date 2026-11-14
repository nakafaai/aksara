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
          label: "$$(-4,-3)$$",
        },
        {
          correct: false,
          label: "$$(-3,4)$$",
        },
        {
          correct: false,
          label: "$$(3,4)$$",
        },
        {
          correct: false,
          label: "$$(-4,3)$$",
        },
      ],
    },
  },
};

export default item;
