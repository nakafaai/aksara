import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{2x + 12}{x^2 - 4}$$",
        },
        {
          correct: true,
          label: "$$\\frac{x - 4}{x^2 - 4}$$",
        },
        {
          correct: false,
          label: "$$\\frac{x - 12}{x^2 - 4}$$",
        },
        {
          correct: false,
          label: "$$\\frac{-x + 12}{x^2 - 4}$$",
        },
        {
          correct: false,
          label: "$$\\frac{-2x}{x^2 - 4}$$",
        },
      ],
    },
  },
};

export default item;
