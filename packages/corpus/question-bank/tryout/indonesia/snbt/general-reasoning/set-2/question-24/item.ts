import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$5$$",
        },
        {
          correct: true,
          label: "$$\\frac{25}{4}$$",
        },
        {
          correct: false,
          label: "$$\\frac{23}{4}$$",
        },
        {
          correct: false,
          label: "$$6$$",
        },
        {
          correct: false,
          label: "$$7$$",
        },
      ],
    },
  },
};

export default item;
