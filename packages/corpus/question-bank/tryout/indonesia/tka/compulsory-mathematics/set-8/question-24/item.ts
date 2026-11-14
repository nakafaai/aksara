import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "probability",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{3}{1{.}120}$$",
        },
        {
          correct: true,
          label: "$$\\frac{3}{560}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{140}$$",
        },
        {
          correct: false,
          label: "$$\\frac{3}{280}$$",
        },
        {
          correct: false,
          label: "$$\\frac{3}{14}$$",
        },
      ],
    },
  },
};

export default item;
