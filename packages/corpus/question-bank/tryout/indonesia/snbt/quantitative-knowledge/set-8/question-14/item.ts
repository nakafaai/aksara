import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{1}{11}$$",
        },
        {
          correct: true,
          label: "$$\\frac{2}{11}$$",
        },
        {
          correct: false,
          label: "$$\\frac{4}{11}$$",
        },
        {
          correct: false,
          label: "$$\\frac{3}{5}$$",
        },
        {
          correct: false,
          label: "$$\\frac{5}{7}$$",
        },
      ],
    },
  },
};

export default item;
