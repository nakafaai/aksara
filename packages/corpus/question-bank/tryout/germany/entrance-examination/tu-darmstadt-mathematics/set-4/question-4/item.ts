import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$(-1\\mid4)$$",
        },
        {
          correct: false,
          label: "$$(5\\mid-6)$$",
        },
        {
          correct: false,
          label: "$$(-8\\mid11)$$",
        },
        {
          correct: false,
          label: "$$\\left(-\\frac12\\mid2\\right)$$",
        },
        {
          correct: false,
          label: "$$(7\\mid3)$$",
        },
        {
          correct: true,
          label: "$$(7\\mid-7)$$",
        },
      ],
    },
  },
};

export default item;
