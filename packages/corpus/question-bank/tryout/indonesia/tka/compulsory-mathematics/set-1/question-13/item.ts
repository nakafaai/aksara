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
          correct: false,
          label: "$$(5,8)$$",
        },
        {
          correct: false,
          label: "$$(1,7)$$",
        },
        {
          correct: false,
          label: "$$(1,3)$$",
        },
        {
          correct: false,
          label: "$$(-3,-1)$$",
        },
        {
          correct: true,
          label: "$$(1,9)$$",
        },
      ],
    },
  },
};

export default item;
