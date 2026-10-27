import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac18$$",
        },
        {
          correct: false,
          label: "$$\\frac5{42}$$",
        },
        {
          correct: false,
          label: "$$\\frac16$$",
        },
        {
          correct: false,
          label: "$$\\frac5{28}$$",
        },
        {
          correct: true,
          label: "$$\\frac{13}{84}$$",
        },
      ],
    },
  },
};

export default item;
