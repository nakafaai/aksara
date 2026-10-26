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
          label: "$$\\frac{3}{7}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{7}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{4}$$",
        },
        {
          correct: false,
          label: "$$\\frac{8}{9}$$",
        },
      ],
    },
  },
};

export default item;
