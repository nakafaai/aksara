import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\left(\\dfrac{32\\pi}{3}-8\\sqrt3\\right)\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$\\left(\\dfrac{16\\pi}{3}-4\\sqrt3\\right)\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$\\left(\\dfrac{32\\pi}{3}-4\\sqrt3\\right)\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$\\left(\\dfrac{32\\pi}{3}-16\\sqrt3\\right)\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$\\left(\\dfrac{16\\pi}{3}-8\\sqrt3\\right)\\text{ cm}^2$$",
        },
      ],
    },
  },
};

export default item;
