import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$(2\\mid1)$$",
        },
        {
          correct: true,
          label: "$$(0\\mid2)$$",
        },
        {
          correct: false,
          label: "$$(4\\mid0)$$",
        },
        {
          correct: false,
          label: "$$\\left(\\frac23\\mid\\frac53\\right)$$",
        },
        {
          correct: false,
          label: "$$(8\\mid-4)$$",
        },
        {
          correct: false,
          label: "$$(-4\\mid4)$$",
        },
      ],
    },
  },
};

export default item;
