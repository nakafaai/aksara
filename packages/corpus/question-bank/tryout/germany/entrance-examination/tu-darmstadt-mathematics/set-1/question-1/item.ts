import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$-1$$",
        },
        {
          correct: false,
          label: "$$0$$",
        },
        {
          correct: true,
          label: "$$1$$",
        },
        {
          correct: false,
          label: "$$\\frac{a-3}{a+3}$$",
        },
        {
          correct: false,
          label: "$$\\frac{a+3}{a-3}$$",
        },
        {
          correct: false,
          label: "$$a+3$$",
        },
      ],
    },
  },
};

export default item;
