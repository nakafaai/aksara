import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac18$$",
        },
        {
          correct: false,
          label: "$$\\frac16$$",
        },
        {
          correct: true,
          label: "$$\\frac17$$",
        },
        {
          correct: false,
          label: "$$\\frac15$$",
        },
        {
          correct: false,
          label: "$$\\frac14$$",
        },
      ],
    },
  },
};

export default item;
