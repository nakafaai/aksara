import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$h(t) = 8 \\sin\\left(6{,}2\\pi t\\right)$$",
        },
        {
          correct: true,
          label: "$$h(t) = 8 \\sin\\left(\\frac{2\\pi}{12{,}4}t\\right)$$",
        },
        {
          correct: false,
          label: "$$h(t) = 8 \\sin\\left(\\frac{2\\pi}{6{,}2}t\\right)$$",
        },
        {
          correct: false,
          label: "$$h(t) = 16 \\sin\\left(\\frac{2\\pi}{6{,}2}t\\right)$$",
        },
        {
          correct: false,
          label: "$$h(t) = 16 \\sin\\left(\\frac{2\\pi}{12{,}4}t\\right)$$",
        },
      ],
    },
  },
};

export default item;
