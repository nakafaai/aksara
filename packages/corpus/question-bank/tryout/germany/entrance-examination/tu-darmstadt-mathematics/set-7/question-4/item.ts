import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{4\\sqrt2}{3}$$",
        },
        {
          correct: false,
          label: "$$2\\sqrt2$$",
        },
        {
          correct: false,
          label: "$$4\\sqrt2$$",
        },
        {
          correct: true,
          label: "$$4$$",
        },
        {
          correct: false,
          label: "$$\\sqrt2$$",
        },
        {
          correct: false,
          label: "$$2$$",
        },
      ],
    },
  },
};

export default item;
