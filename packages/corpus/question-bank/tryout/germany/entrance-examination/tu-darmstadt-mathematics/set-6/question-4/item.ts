import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\sqrt{22}$$",
        },
        {
          correct: false,
          label: "$$\\frac{\\sqrt{79}}{2}$$",
        },
        {
          correct: false,
          label: "$$2\\sqrt6$$",
        },
        {
          correct: true,
          label: "$$3\\sqrt2$$",
        },
        {
          correct: false,
          label: "$$3$$",
        },
        {
          correct: false,
          label: "$$3\\sqrt3$$",
        },
      ],
    },
  },
};

export default item;
