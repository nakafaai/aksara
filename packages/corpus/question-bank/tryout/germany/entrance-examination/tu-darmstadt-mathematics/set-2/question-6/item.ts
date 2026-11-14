import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{200\\pi}{3}\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$24\\pi\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$128\\pi\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$\\frac{272\\pi}{3}\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$\\frac{128\\pi}{3}\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$\\frac{80\\pi}{3}\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
