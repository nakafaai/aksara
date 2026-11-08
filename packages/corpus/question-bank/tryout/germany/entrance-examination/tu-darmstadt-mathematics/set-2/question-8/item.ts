import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$(0\\mid-2)$$",
        },
        {
          correct: true,
          label: "$$(0\\mid-1)$$",
        },
        {
          correct: false,
          label: "$$(0\\mid2{,}5)$$",
        },
        {
          correct: false,
          label: "$$(0\\mid1)$$",
        },
        {
          correct: false,
          label: "$$(0\\mid3)$$",
        },
        {
          correct: false,
          label: "$$(0\\mid7)$$",
        },
      ],
    },
  },
};

export default item;
