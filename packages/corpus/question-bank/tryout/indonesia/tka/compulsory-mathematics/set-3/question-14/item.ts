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
          label: "$$(2,-3)$$",
        },
        {
          correct: false,
          label: "$$(3,2)$$",
        },
        {
          correct: true,
          label: "$$(-3,-2)$$",
        },
        {
          correct: false,
          label: "$$(-2,-3)$$",
        },
        {
          correct: false,
          label: "$$(3,-2)$$",
        },
      ],
    },
  },
};

export default item;
