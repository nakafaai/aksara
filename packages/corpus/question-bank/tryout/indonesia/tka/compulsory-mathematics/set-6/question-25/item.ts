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
          label: "$$\\frac15$$",
        },
        {
          correct: true,
          label: "$$\\frac25$$",
        },
        {
          correct: false,
          label: "$$\\frac12$$",
        },
        {
          correct: false,
          label: "$$\\frac35$$",
        },
      ],
    },
  },
};

export default item;
