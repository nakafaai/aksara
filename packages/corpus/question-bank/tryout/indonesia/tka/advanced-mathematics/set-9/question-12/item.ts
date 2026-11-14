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
          correct: false,
          label: "$$(12,-6,12)$$",
        },
        {
          correct: true,
          label: "$$(4,-2,4)$$",
        },
        {
          correct: false,
          label: "$$6$$",
        },
        {
          correct: false,
          label: "$$(2,-1,2)$$",
        },
        {
          correct: false,
          label: "$$\\frac{18}{41}(5,0,4)$$",
        },
      ],
    },
  },
};

export default item;
