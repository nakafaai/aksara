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
          label: "$$(-3,7)$$",
        },
        {
          correct: false,
          label: "$$(2,-7)$$",
        },
        {
          correct: false,
          label: "$$(4,4)$$",
        },
        {
          correct: false,
          label: "$$(8,-7)$$",
        },
        {
          correct: true,
          label: "$$(2,7)$$",
        },
      ],
    },
  },
};

export default item;
