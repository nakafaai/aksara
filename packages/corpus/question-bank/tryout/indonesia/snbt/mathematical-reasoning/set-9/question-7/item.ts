import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\frac{21}{2}$$",
        },
        {
          correct: false,
          label: "$$9$$",
        },
        {
          correct: false,
          label: "$$10$$",
        },
        {
          correct: false,
          label: "$$11$$",
        },
        {
          correct: false,
          label: "$$\\frac{23}{2}$$",
        },
      ],
    },
  },
};

export default item;
