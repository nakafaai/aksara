import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{2+b}{a+b}$$",
        },
        {
          correct: false,
          label: "$$\\frac{2+ab}{a+b}$$",
        },
        {
          correct: false,
          label: "$$\\frac{2ab}{a+ab}$$",
        },
        {
          correct: true,
          label: "$$\\frac{2+ab}{a+ab}$$",
        },
        {
          correct: false,
          label: "$$\\frac{2+ab}{a^2b}$$",
        },
        {
          correct: false,
          label: "$$\\frac{a+ab}{2+ab}$$",
        },
      ],
    },
  },
};

export default item;
