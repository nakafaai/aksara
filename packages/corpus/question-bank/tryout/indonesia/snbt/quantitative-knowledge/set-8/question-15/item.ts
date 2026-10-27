import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$-\\frac{1008}{2015}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{2015}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1007}{2015}$$",
        },
        {
          correct: true,
          label: "$$-\\frac{1007}{2015}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1008}{2015}$$",
        },
      ],
    },
  },
};

export default item;
