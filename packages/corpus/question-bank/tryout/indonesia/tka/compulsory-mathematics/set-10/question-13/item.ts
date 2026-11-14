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
          label: "$$(-6,4)$$",
        },
        {
          correct: true,
          label: "$$(-2,6)$$",
        },
        {
          correct: false,
          label: "$$(2,4)$$",
        },
        {
          correct: false,
          label: "$$(4,0)$$",
        },
        {
          correct: false,
          label: "$$(8,8)$$",
        },
      ],
    },
  },
};

export default item;
