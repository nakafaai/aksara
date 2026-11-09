import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\sqrt5-\\sqrt3$$",
        },
        {
          correct: false,
          label: "$$\\frac{\\sqrt5+\\sqrt3}{4}$$",
        },
        {
          correct: false,
          label: "$$\\frac{\\sqrt5+\\sqrt3}{2}$$",
        },
        {
          correct: false,
          label: "$$\\sqrt2$$",
        },
        {
          correct: false,
          label: "$$2\\sqrt5+2\\sqrt3$$",
        },
        {
          correct: true,
          label: "$$\\sqrt5+\\sqrt3$$",
        },
      ],
    },
  },
};

export default item;
