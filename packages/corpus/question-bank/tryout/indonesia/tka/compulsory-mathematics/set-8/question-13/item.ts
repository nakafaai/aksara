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
          label: "$$(-4,3)$$",
        },
        {
          correct: true,
          label: "$$(4,-3)$$",
        },
        {
          correct: false,
          label: "$$(4,3)$$",
        },
        {
          correct: false,
          label: "$$(4,7)$$",
        },
        {
          correct: false,
          label: "$$(5,0)$$",
        },
      ],
    },
  },
};

export default item;
