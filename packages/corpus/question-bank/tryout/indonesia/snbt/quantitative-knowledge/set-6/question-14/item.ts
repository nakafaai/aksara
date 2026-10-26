import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$-\\frac{3}{5}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{5}$$",
        },
        {
          correct: false,
          label: "$$\\frac{4}{3}$$",
        },
        {
          correct: false,
          label: "$$\\frac{2}{3}$$",
        },
        {
          correct: false,
          label: "$$\\frac{3}{5}$$",
        },
      ],
    },
  },
};

export default item;
