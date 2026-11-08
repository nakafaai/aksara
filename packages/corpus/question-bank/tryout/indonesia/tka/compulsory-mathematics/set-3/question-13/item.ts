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
          label: "$$(5,12)$$",
        },
        {
          correct: false,
          label: "$$(-7,2)$$",
        },
        {
          correct: false,
          label: "$$(1,12)$$",
        },
        {
          correct: false,
          label: "$$(3,12)$$",
        },
        {
          correct: false,
          label: "$$(11,12)$$",
        },
      ],
    },
  },
};

export default item;
