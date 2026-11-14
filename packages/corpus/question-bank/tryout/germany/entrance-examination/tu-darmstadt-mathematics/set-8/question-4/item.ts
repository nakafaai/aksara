import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$(13\\mid7)$$",
        },
        {
          correct: false,
          label: "$$(-1\\mid-3)$$",
        },
        {
          correct: false,
          label: "$$\\left(\\frac92\\mid\\frac72\\right)$$",
        },
        {
          correct: false,
          label: "$$(2\\mid4)$$",
        },
        {
          correct: false,
          label: "$$(5\\mid1)$$",
        },
        {
          correct: true,
          label: "$$(3\\mid5)$$",
        },
      ],
    },
  },
};

export default item;
