import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{1}{2}$$",
        },
        {
          correct: true,
          label: "$$\\frac{1}{3}$$",
        },
        {
          correct: false,
          label: "$$\\frac{2}{3}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{4}$$",
        },
        {
          correct: false,
          label: "$$\\frac{3}{4}$$",
        },
      ],
    },
  },
};

export default item;
