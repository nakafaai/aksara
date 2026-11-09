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
          label: "$$(3,2)$$",
        },
        {
          correct: false,
          label: "$$(2,3)$$",
        },
        {
          correct: false,
          label: "$$(8,1)$$",
        },
        {
          correct: false,
          label: "$$(1,8)$$",
        },
        {
          correct: false,
          label: "$$(-1,6)$$",
        },
      ],
    },
  },
};

export default item;
