import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$(-4\\mid-3)$$",
        },
        {
          correct: true,
          label: "$$(0\\mid5)$$",
        },
        {
          correct: false,
          label: "$$(0\\mid3)$$",
        },
        {
          correct: false,
          label: "$$(1{,}5\\mid2)$$",
        },
        {
          correct: false,
          label: "$$(4\\mid3)$$",
        },
        {
          correct: false,
          label: "$$(10\\mid1)$$",
        },
      ],
    },
  },
};

export default item;
