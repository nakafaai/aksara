import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\frac{29}{53}$$",
        },
        {
          correct: false,
          label: "$$\\frac12$$",
        },
        {
          correct: false,
          label: "$$\\frac35$$",
        },
        {
          correct: false,
          label: "$$\\frac{31}{53}$$",
        },
        {
          correct: false,
          label: "$$\\frac23$$",
        },
      ],
    },
  },
};

export default item;
