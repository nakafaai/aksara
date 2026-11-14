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
          label: "$$(7,-4)$$",
        },
        {
          correct: false,
          label: "$$(-8,2)$$",
        },
        {
          correct: false,
          label: "$$(-6,6)$$",
        },
        {
          correct: false,
          label: "$$(-7,4)$$",
        },
        {
          correct: true,
          label: "$$(-5,8)$$",
        },
      ],
    },
  },
};

export default item;
