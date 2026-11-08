import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac18$$",
        },
        {
          correct: false,
          label: "$$\\frac14$$",
        },
        {
          correct: true,
          label: "$$\\frac12$$",
        },
        {
          correct: false,
          label: "$$1$$",
        },
        {
          correct: false,
          label: "$$2$$",
        },
        {
          correct: false,
          label: "$$4$$",
        },
      ],
    },
  },
};

export default item;
