import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\left(-\\frac23\\mid0\\right)$$",
        },
        {
          correct: false,
          label: "$$\\left(\\frac23\\mid0\\right)$$",
        },
        {
          correct: false,
          label: "$$\\left(\\frac{14}{3}\\mid0\\right)$$",
        },
        {
          correct: false,
          label: "$$(-2\\mid0)$$",
        },
        {
          correct: false,
          label: "$$(0\\mid2)$$",
        },
        {
          correct: false,
          label: "$$(2\\mid0)$$",
        },
      ],
    },
  },
};

export default item;
