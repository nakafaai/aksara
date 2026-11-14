import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "data-probability",
    topic: "probability",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{1}{10}$$",
        },
        {
          correct: false,
          label: "$$\\frac{3}{10}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{3}$$",
        },
        {
          correct: false,
          label: "$$\\frac{9}{17}$$",
        },
        {
          correct: true,
          label: "$$\\frac{3}{5}$$",
        },
      ],
    },
  },
};

export default item;
