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
          label: "$$(-2,4)$$",
        },
        {
          correct: false,
          label: "$$(-4,5)$$",
        },
        {
          correct: false,
          label: "$$(-3,7)$$",
        },
        {
          correct: false,
          label: "$$(6,4)$$",
        },
        {
          correct: false,
          label: "$$(6,-6)$$",
        },
      ],
    },
  },
};

export default item;
