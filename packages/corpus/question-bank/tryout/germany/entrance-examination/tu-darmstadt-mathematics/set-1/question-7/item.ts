import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$(-1\\mid0)$$",
        },
        {
          correct: true,
          label: "$$(1\\mid0)$$",
        },
        {
          correct: false,
          label: "$$(2\\mid0)$$",
        },
        {
          correct: false,
          label: "$$(0\\mid2)$$",
        },
        {
          correct: false,
          label: "$$(0\\mid1)$$",
        },
        {
          correct: false,
          label: "$$(7\\mid0)$$",
        },
      ],
    },
  },
};

export default item;
