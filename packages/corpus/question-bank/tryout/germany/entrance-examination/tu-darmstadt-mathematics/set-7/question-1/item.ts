import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1$$",
        },
        {
          correct: true,
          label: "$$-1$$",
        },
        {
          correct: false,
          label: "$$-2$$",
        },
        {
          correct: false,
          label: "$$-\\frac12$$",
        },
        {
          correct: false,
          label: "$$2$$",
        },
        {
          correct: false,
          label: "$$\\frac12$$",
        },
      ],
    },
  },
};

export default item;
