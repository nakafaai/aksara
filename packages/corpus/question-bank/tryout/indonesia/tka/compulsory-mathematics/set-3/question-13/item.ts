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
          label: "$$(-1,12)$$",
        },
        {
          correct: false,
          label: "$$(-7,-4)$$",
        },
        {
          correct: false,
          label: "$$(0,12)$$",
        },
        {
          correct: false,
          label: "$$(1,12)$$",
        },
        {
          correct: false,
          label: "$$(5,12)$$",
        },
      ],
    },
  },
};

export default item;
