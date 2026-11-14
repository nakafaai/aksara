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
          label: "$$\\frac{1}{5}$$",
        },
        {
          correct: true,
          label: "$$\\frac{2}{11}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{6}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{11}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{18}$$",
        },
      ],
    },
  },
};

export default item;
