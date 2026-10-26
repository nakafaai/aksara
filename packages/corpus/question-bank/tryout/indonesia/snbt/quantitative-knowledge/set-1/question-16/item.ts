import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{x + y}{12}$$",
        },
        {
          correct: false,
          label: "$$\\frac{2x + y}{12}$$",
        },
        {
          correct: false,
          label: "$$\\frac{3x + y}{12}$$",
        },
        {
          correct: true,
          label: "$$\\frac{4x + y}{12}$$",
        },
        {
          correct: false,
          label: "$$\\frac{5x + y}{12}$$",
        },
      ],
    },
  },
};

export default item;
