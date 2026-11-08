import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "probability",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{20}{81}$$",
        },
        {
          correct: true,
          label: "$$\\frac14$$",
        },
        {
          correct: false,
          label: "$$\\frac{5}{18}$$",
        },
        {
          correct: false,
          label: "$$\\frac49$$",
        },
        {
          correct: false,
          label: "$$\\frac59$$",
        },
      ],
    },
  },
};

export default item;
