import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{10}{16}$$",
        },
        {
          correct: false,
          label: "$$\\frac{11}{17}$$",
        },
        {
          correct: true,
          label: "$$\\frac{17}{11}$$",
        },
        {
          correct: false,
          label: "$$\\frac{9}{10}$$",
        },
        {
          correct: false,
          label: "$$\\frac{27}{26}$$",
        },
      ],
    },
  },
};

export default item;
