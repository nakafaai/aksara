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
          label: "$$\\frac{9}{38}$$",
        },
        {
          correct: false,
          label: "$$\\frac14$$",
        },
        {
          correct: true,
          label: "$$\\frac{9}{19}$$",
        },
        {
          correct: false,
          label: "$$\\frac12$$",
        },
        {
          correct: false,
          label: "$$\\frac{10}{19}$$",
        },
      ],
    },
  },
};

export default item;
