import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$(-2,7)$$",
        },
        {
          correct: false,
          label: "$$(2,-7)$$",
        },
        {
          correct: true,
          label: "$$(7,2)$$",
        },
        {
          correct: false,
          label: "$$(-7,-2)$$",
        },
        {
          correct: false,
          label: "$$\\left(\\frac12,\\frac17\\right)$$",
        },
      ],
    },
  },
};

export default item;
