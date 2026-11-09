import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$-\\frac23$$",
        },
        {
          correct: true,
          label: "$$2$$",
        },
        {
          correct: false,
          label: "$$\\frac{10}{3}$$",
        },
        {
          correct: false,
          label: "$$\\frac{14}{3}$$",
        },
        {
          correct: false,
          label: "$$6$$",
        },
      ],
    },
  },
};

export default item;
