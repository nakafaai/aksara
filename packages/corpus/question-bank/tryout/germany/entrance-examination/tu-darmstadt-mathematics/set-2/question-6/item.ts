import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$(-3\\mid7)$$",
        },
        {
          correct: false,
          label: "$$(3\\mid34)$$",
        },
        {
          correct: false,
          label: "$$(-6\\mid7)$$",
        },
        {
          correct: false,
          label: "$$(-3\\mid2)$$",
        },
        {
          correct: false,
          label: "$$(-3\\mid16)$$",
        },
        {
          correct: true,
          label: "$$(-3\\mid-2)$$",
        },
      ],
    },
  },
};

export default item;
