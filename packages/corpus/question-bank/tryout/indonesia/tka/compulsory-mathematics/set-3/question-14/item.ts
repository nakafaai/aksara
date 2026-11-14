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
          label: "$$(-14,-8)$$",
        },
        {
          correct: false,
          label: "$$(-9,-3)$$",
        },
        {
          correct: false,
          label: "$$(-4,2)$$",
        },
        {
          correct: true,
          label: "$$(1,7)$$",
        },
        {
          correct: false,
          label: "$$(5,-5)$$",
        },
      ],
    },
  },
};

export default item;
