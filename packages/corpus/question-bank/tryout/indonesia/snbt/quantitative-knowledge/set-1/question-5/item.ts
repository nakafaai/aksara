import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$-\\frac{4}{3}$$",
        },
        {
          correct: false,
          label: "$$\\frac{3}{4}$$",
        },
        {
          correct: true,
          label: "$$-\\frac{3}{4}$$",
        },
        {
          correct: false,
          label: "$$\\frac{4}{3}$$",
        },
        {
          correct: false,
          label: "$$0$$",
        },
      ],
    },
  },
};

export default item;
