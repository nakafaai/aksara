import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$(-4,6)$$",
        },
        {
          correct: false,
          label: "$$(4,-6)$$",
        },
        {
          correct: false,
          label: "$$(-6,9)$$",
        },
        {
          correct: false,
          label: "$$(-12,18)$$",
        },
        {
          correct: false,
          label: "$$(-4,-6)$$",
        },
      ],
    },
  },
};

export default item;
