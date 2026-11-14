import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "vectors",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$(4,5,0)$$",
        },
        {
          correct: false,
          label: "$$\\left(\\frac52,\\frac72,\\frac32\\right)$$",
        },
        {
          correct: false,
          label: "$$(0,1,4)$$",
        },
        {
          correct: false,
          label: "$$(7,8,-3)$$",
        },
        {
          correct: false,
          label: "$$(2,3,2)$$",
        },
      ],
    },
  },
};

export default item;
