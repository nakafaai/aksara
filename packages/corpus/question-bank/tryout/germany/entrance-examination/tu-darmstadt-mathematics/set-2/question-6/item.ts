import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$(2\\mid3)$$",
        },
        {
          correct: false,
          label: "$$(-2\\mid15)$$",
        },
        {
          correct: false,
          label: "$$(4\\mid3)$$",
        },
        {
          correct: false,
          label: "$$(1\\mid0)$$",
        },
        {
          correct: false,
          label: "$$(3\\mid0)$$",
        },
        {
          correct: true,
          label: "$$(2\\mid-1)$$",
        },
      ],
    },
  },
};

export default item;
