import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "geometric-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2$$",
        },
        {
          correct: true,
          label: "$$\\frac12$$",
        },
        {
          correct: false,
          label: "$$\\frac43$$",
        },
        {
          correct: false,
          label: "$$\\frac34$$",
        },
        {
          correct: false,
          label: "$$-2$$",
        },
      ],
    },
  },
};

export default item;
