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
          correct: false,
          label: "$$\\frac{10}{3}$$",
        },
        {
          correct: false,
          label: "$$\\sqrt{14}$$",
        },
        {
          correct: true,
          label: "$$\\frac{\\sqrt{26}}{3}$$",
        },
        {
          correct: false,
          label: "$$\\frac{26}{9}$$",
        },
        {
          correct: false,
          label: "$$\\frac{4\\sqrt6}{3}$$",
        },
      ],
    },
  },
};

export default item;
