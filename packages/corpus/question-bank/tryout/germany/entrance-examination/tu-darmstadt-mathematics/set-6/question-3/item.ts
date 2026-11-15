import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$H(2\\mid2)$$",
        },
        {
          correct: false,
          label: "$$H(4\\mid2)$$",
        },
        {
          correct: false,
          label: "$$H\\left(\\frac{10}{3}\\mid2\\right)$$",
        },
        {
          correct: false,
          label: "$$H(2\\mid6)$$",
        },
        {
          correct: false,
          label: "$$H(2\\mid4)$$",
        },
        {
          correct: false,
          label: "$$H(6\\mid2)$$",
        },
      ],
    },
  },
};

export default item;
