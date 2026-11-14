import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "polynomials",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\frac{11x-5}{2}$$",
        },
        {
          correct: false,
          label: "$$11x-5$$",
        },
        {
          correct: false,
          label: "$$4x-1$$",
        },
        {
          correct: false,
          label: "$$7x-7$$",
        },
        {
          correct: false,
          label: "$$\\frac{11x+5}{2}$$",
        },
      ],
    },
  },
};

export default item;
