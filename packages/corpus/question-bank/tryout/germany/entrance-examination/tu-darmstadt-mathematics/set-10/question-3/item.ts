import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac32\\le x\\le4$$",
        },
        {
          correct: true,
          label: "$$\\frac23\\le x\\le4$$",
        },
        {
          correct: false,
          label: "$$x\\le4$$",
        },
        {
          correct: false,
          label: "$$\\frac23\\le x<\\frac32$$",
        },
        {
          correct: false,
          label: "$$-4\\le x\\le-\\frac23$$",
        },
        {
          correct: false,
          label: "$$\\frac23<x<4$$",
        },
      ],
    },
  },
};

export default item;
