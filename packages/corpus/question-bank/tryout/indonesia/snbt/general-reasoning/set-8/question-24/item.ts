import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{20}{3}$$",
        },
        {
          correct: false,
          label: "$$7$$",
        },
        {
          correct: true,
          label: "$$\\frac{23}{3}$$",
        },
        {
          correct: false,
          label: "$$8$$",
        },
        {
          correct: false,
          label: "$$\\frac{25}{3}$$",
        },
      ],
    },
  },
};

export default item;
