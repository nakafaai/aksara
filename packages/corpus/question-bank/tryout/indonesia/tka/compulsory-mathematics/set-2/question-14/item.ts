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
          label: "$$(-5,1)$$",
        },
        {
          correct: false,
          label: "$$(-3,2)$$",
        },
        {
          correct: false,
          label: "$$(-4,0)$$",
        },
        {
          correct: true,
          label: "$$(-4,4)$$",
        },
        {
          correct: false,
          label: "$$(2,0)$$",
        },
      ],
    },
  },
};

export default item;
