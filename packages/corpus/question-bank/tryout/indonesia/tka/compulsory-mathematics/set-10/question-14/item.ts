import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$(6,11)$$",
        },
        {
          correct: true,
          label: "$$(4,7)$$",
        },
        {
          correct: false,
          label: "$$(3,5)$$",
        },
        {
          correct: false,
          label: "$$(2,3)$$",
        },
        {
          correct: false,
          label: "$$(0,-1)$$",
        },
      ],
    },
  },
};

export default item;
