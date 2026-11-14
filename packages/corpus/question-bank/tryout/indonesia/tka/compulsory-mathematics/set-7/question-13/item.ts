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
          correct: true,
          label: "$$(-2,4)$$",
        },
        {
          correct: false,
          label: "$$(-4,-2)$$",
        },
        {
          correct: false,
          label: "$$(2,-4)$$",
        },
        {
          correct: false,
          label: "$$(\\sqrt2,\\ 3\\sqrt2)$$",
        },
        {
          correct: false,
          label: "$$(2\\sqrt3-1,\\ \\sqrt3+2)$$",
        },
      ],
    },
  },
};

export default item;
