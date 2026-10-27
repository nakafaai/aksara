import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\frac{323}{999}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{3}$$",
        },
        {
          correct: false,
          label: "$$\\frac{32}{99}$$",
        },
        {
          correct: false,
          label: "$$\\frac{23}{99}$$",
        },
        {
          correct: false,
          label: "$$\\frac{232}{999}$$",
        },
      ],
    },
  },
};

export default item;
