import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\frac1{56}$$",
        },
        {
          correct: false,
          label: "$$\\frac1{72}$$",
        },
        {
          correct: false,
          label: "$$\\frac1{63}$$",
        },
        {
          correct: false,
          label: "$$\\frac1{48}$$",
        },
        {
          correct: false,
          label: "$$\\frac1{42}$$",
        },
      ],
    },
  },
};

export default item;
