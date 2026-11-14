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
          label: "$$(-57,2)$$",
        },
        {
          correct: false,
          label: "$$(-15,2)$$",
        },
        {
          correct: false,
          label: "$$(-5,2)$$",
        },
        {
          correct: true,
          label: "$$(-1,2)$$",
        },
        {
          correct: false,
          label: "$$(9,2)$$",
        },
      ],
    },
  },
};

export default item;
