import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "geometric-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$(4,3)$$",
        },
        {
          correct: false,
          label: "$$(6,4)$$",
        },
        {
          correct: true,
          label: "$$(2,2)$$",
        },
        {
          correct: false,
          label: "$$(0,0)$$",
        },
        {
          correct: false,
          label: "$$(0,1)$$",
        },
      ],
    },
  },
};

export default item;
