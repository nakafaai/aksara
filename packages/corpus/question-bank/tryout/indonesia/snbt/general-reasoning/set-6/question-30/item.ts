import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$8$$",
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
          correct: true,
          label: "$$\\frac{100}{11}$$",
        },
        {
          correct: false,
          label: "$$11$$",
        },
      ],
    },
  },
};

export default item;
