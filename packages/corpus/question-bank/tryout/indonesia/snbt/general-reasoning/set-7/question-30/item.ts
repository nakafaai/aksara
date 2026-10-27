import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac13$$",
        },
        {
          correct: false,
          label: "$$\\frac25$$",
        },
        {
          correct: true,
          label: "$$\\frac12$$",
        },
        {
          correct: false,
          label: "$$\\frac35$$",
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
