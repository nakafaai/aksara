import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$-\\frac{3}{2}$$",
        },
        {
          correct: false,
          label: "$$-\\frac{1}{2}$$",
        },
        {
          correct: false,
          label: "$$\\frac{3}{2}$$",
        },
        {
          correct: true,
          label: "$$-\\frac{5}{2}$$",
        },
        {
          correct: false,
          label: "$$\\frac{5}{2}$$",
        },
      ],
    },
  },
};

export default item;
