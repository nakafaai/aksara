import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$30$$",
        },
        {
          correct: true,
          label: "$$60$$",
        },
        {
          correct: false,
          label: "$$30\\sqrt2$$",
        },
        {
          correct: false,
          label: "$$30\\sqrt3$$",
        },
        {
          correct: false,
          label: "$$60\\sqrt3$$",
        },
      ],
    },
  },
};

export default item;
