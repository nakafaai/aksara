import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "vectors",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$\\frac{28}{9}\\vec{i}+\\frac{14}{9}\\vec{j}+\\frac{28}{9}\\vec{k}$$",
        },
        {
          correct: false,
          label:
            "$$\\frac{28}{3}\\vec{i}+\\frac{14}{3}\\vec{j}+\\frac{28}{3}\\vec{k}$$",
        },
        {
          correct: false,
          label:
            "$$\\frac{14}{9}\\vec{i}-\\frac{7}{9}\\vec{j}+\\frac{14}{9}\\vec{k}$$",
        },
        {
          correct: false,
          label: "$$28\\vec{i}+14\\vec{j}+28\\vec{k}$$",
        },
        {
          correct: false,
          label:
            "$$\\frac{28}{9}\\vec{i}-\\frac{14}{9}\\vec{j}+\\frac{28}{9}\\vec{k}$$",
        },
      ],
    },
  },
};

export default item;
