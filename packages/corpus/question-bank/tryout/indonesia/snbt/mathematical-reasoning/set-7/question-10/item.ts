import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{1}{20}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{10}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{8}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{4}$$",
        },
        {
          correct: true,
          label: "$$\\frac{3}{4}$$",
        },
      ],
    },
  },
};

export default item;
