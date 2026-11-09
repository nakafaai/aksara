import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$(2\\mid9)$$",
        },
        {
          correct: false,
          label: "$$(-2\\mid-9)$$",
        },
        {
          correct: false,
          label: "$$(2\\mid-5)$$",
        },
        {
          correct: false,
          label: "$$(4\\mid-5)$$",
        },
        {
          correct: true,
          label: "$$(2\\mid-9)$$",
        },
        {
          correct: false,
          label: "$$(3\\mid-8)$$",
        },
      ],
    },
  },
};

export default item;
