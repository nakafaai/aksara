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
          label: "$$(-5,-2)$$",
        },
        {
          correct: false,
          label: "$$(-2,-5)$$",
        },
        {
          correct: false,
          label: "$$(5,-2)$$",
        },
        {
          correct: false,
          label: "$$(5,2)$$",
        },
        {
          correct: true,
          label: "$$(-5,2)$$",
        },
      ],
    },
  },
};

export default item;
