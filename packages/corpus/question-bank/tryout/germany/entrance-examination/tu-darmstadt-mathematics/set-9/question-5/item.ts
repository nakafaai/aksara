import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$P'(1\\mid2)$$",
        },
        {
          correct: false,
          label: "$$P'(0\\mid5)$$",
        },
        {
          correct: false,
          label: "$$P'(-5\\mid0)$$",
        },
        {
          correct: false,
          label: "$$P'(3\\mid-4)$$",
        },
        {
          correct: false,
          label: "$$P'(-4\\mid3)$$",
        },
        {
          correct: true,
          label: "$$P'(-3\\mid4)$$",
        },
      ],
    },
  },
};

export default item;
