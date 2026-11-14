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
          correct: true,
          label: "$$(-8,12)$$",
        },
        {
          correct: false,
          label: "$$(-4,4)$$",
        },
        {
          correct: false,
          label: "$$(0,8)$$",
        },
        {
          correct: false,
          label: "$$(4,6)$$",
        },
        {
          correct: false,
          label: "$$(10,-6)$$",
        },
      ],
    },
  },
};

export default item;
