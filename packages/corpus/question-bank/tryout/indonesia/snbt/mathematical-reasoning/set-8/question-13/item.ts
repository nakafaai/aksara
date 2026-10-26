import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{42}{5}$$",
        },
        {
          correct: false,
          label: "$$\\frac{180}{23}$$",
        },
        {
          correct: false,
          label: "$$\\frac{195}{23}$$",
        },
        {
          correct: false,
          label: "$$\\frac{216}{23}$$",
        },
        {
          correct: true,
          label: "$$\\frac{204}{23}$$",
        },
      ],
    },
  },
};

export default item;
