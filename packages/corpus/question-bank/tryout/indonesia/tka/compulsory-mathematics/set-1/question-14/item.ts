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
          label: "$$(4,-1)$$",
        },
        {
          correct: true,
          label: "$$(-1,4)$$",
        },
        {
          correct: false,
          label: "$$(1,4)$$",
        },
        {
          correct: false,
          label: "$$(-1,-4)$$",
        },
        {
          correct: false,
          label: "$$(1,-4)$$",
        },
      ],
    },
  },
};

export default item;
