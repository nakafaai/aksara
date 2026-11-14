import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "sequences-series",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$153$$",
        },
        {
          correct: true,
          label: "$$185$$",
        },
        {
          correct: false,
          label: "$$200$$",
        },
        {
          correct: false,
          label: "$$\\frac{805}{3}$$",
        },
        {
          correct: false,
          label: "$$32$$",
        },
      ],
    },
  },
};

export default item;
