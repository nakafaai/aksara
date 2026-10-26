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
          label: "$$\\frac2{63}$$",
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
          label: "$$\\frac1{18}$$",
        },
      ],
    },
  },
};

export default item;
