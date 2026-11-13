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
          label: "$$(-4,2)$$",
        },
        {
          correct: false,
          label: "$$(-4,10)$$",
        },
        {
          correct: false,
          label: "$$(-2,2)$$",
        },
        {
          correct: true,
          label: "$$(2,2)$$",
        },
        {
          correct: false,
          label: "$$(2,10)$$",
        },
      ],
    },
  },
};

export default item;
