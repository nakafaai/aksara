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
          correct: false,
          label: "$$2x$$",
        },
        {
          correct: false,
          label: "$$2x^3+2x$$",
        },
        {
          correct: false,
          label: "$$29x-27$$",
        },
        {
          correct: true,
          label: "$$28x-24$$",
        },
        {
          correct: false,
          label: "$$28x+24$$",
        },
      ],
    },
  },
};

export default item;
