import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{x^2}{y}$$",
        },
        {
          correct: true,
          label: "$$x^2y$$",
        },
        {
          correct: false,
          label: "$$\\frac{x^{10}}{y^9}$$",
        },
        {
          correct: false,
          label: "$$x^2y^3$$",
        },
        {
          correct: false,
          label: "$$xy^5$$",
        },
        {
          correct: false,
          label: "$$\\frac{x^2}{y^9}$$",
        },
      ],
    },
  },
};

export default item;
