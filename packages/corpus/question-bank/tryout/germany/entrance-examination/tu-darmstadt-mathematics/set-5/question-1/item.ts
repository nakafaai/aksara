import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{x+1}{x^2-1}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{x^2-1}$$",
        },
        {
          correct: false,
          label: "$$-\\frac12$$",
        },
        {
          correct: true,
          label: "$$\\frac{x+3}{x^2-1}$$",
        },
        {
          correct: false,
          label: "$$\\frac{3x+1}{x^2-1}$$",
        },
        {
          correct: false,
          label: "$$\\frac{x+3}{x^2+1}$$",
        },
      ],
    },
  },
};

export default item;
