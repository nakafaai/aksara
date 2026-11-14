import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{25}{4}$$",
        },
        {
          correct: false,
          label: "$$5$$",
        },
        {
          correct: false,
          label: "$$\\frac{21}{4}$$",
        },
        {
          correct: true,
          label: "$$\\frac{17}{4}$$",
        },
        {
          correct: false,
          label: "$$\\frac94$$",
        },
      ],
    },
  },
};

export default item;
