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
          label: "$$(-5,-3)$$",
        },
        {
          correct: false,
          label: "$$(-5,3)$$",
        },
        {
          correct: false,
          label: "$$(-3,-5)$$",
        },
        {
          correct: false,
          label: "$$(5,-3)$$",
        },
        {
          correct: true,
          label: "$$(5,3)$$",
        },
      ],
    },
  },
};

export default item;
