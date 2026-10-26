import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{1}{12}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{4}$$",
        },
        {
          correct: true,
          label: "$$\\frac{5}{12}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{2}$$",
        },
        {
          correct: false,
          label: "$$\\frac{2}{3}$$",
        },
      ],
    },
  },
};

export default item;
