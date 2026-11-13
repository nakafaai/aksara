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
          label: "$$\\frac{27}{100}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{3}$$",
        },
        {
          correct: true,
          label: "$$\\frac{3}{8}$$",
        },
        {
          correct: false,
          label: "$$\\frac{5}{12}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{2}$$",
        },
      ],
    },
  },
};

export default item;
