import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$x_0 + 11$$",
        },
        {
          correct: false,
          label: "$$x_0 + 12$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{2}x_0 + 11$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{2}x_0 + 21$$",
        },
        {
          correct: true,
          label: "$$\\frac{1}{2}x_0 + 12$$",
        },
      ],
    },
  },
};

export default item;
