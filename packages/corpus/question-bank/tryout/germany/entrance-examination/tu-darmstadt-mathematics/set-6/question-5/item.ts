import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$(8\\mid4)$$",
        },
        {
          correct: false,
          label: "$$(8\\mid6)$$",
        },
        {
          correct: false,
          label: "$$(6\\mid6)$$",
        },
        {
          correct: false,
          label: "$$(-8\\mid4)$$",
        },
        {
          correct: false,
          label: "$$(0\\mid2)$$",
        },
        {
          correct: false,
          label: "$$(4\\mid3)$$",
        },
      ],
    },
  },
};

export default item;
