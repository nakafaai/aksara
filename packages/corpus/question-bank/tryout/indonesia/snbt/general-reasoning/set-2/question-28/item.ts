import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac1{42}$$",
        },
        {
          correct: true,
          label: "$$\\frac1{35}$$",
        },
        {
          correct: false,
          label: "$$\\frac1{28}$$",
        },
        {
          correct: false,
          label: "$$\\frac1{21}$$",
        },
        {
          correct: false,
          label: "$$\\frac1{14}$$",
        },
      ],
    },
  },
};

export default item;
