import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{35}{6}$$",
        },
        {
          correct: false,
          label: "$$\\frac{19}{3}$$",
        },
        {
          correct: true,
          label: "$$\\frac{37}{6}$$",
        },
        {
          correct: false,
          label: "$$\\frac{20}{3}$$",
        },
        {
          correct: false,
          label: "$$\\frac{41}{6}$$",
        },
      ],
    },
  },
};

export default item;
