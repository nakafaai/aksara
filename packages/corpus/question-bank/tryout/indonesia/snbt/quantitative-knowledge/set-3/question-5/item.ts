import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{x}{28} + \\frac{4}{7}$$",
        },
        {
          correct: false,
          label: "$$\\frac{x}{28} + \\frac{2}{7}$$",
        },
        {
          correct: false,
          label: "$$\\frac{x}{28} - \\frac{2}{7}$$",
        },
        {
          correct: false,
          label: "$$\\frac{x}{28} + \\frac{3}{7}$$",
        },
        {
          correct: true,
          label: "$$\\frac{x}{28} - \\frac{3}{7}$$",
        },
      ],
    },
  },
};

export default item;
