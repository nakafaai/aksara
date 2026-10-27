import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\frac{4}{3}C + 4{.}000$$",
        },
        {
          correct: false,
          label: "$$C + 4{.}000$$",
        },
        {
          correct: false,
          label: "$$2C + 4{.}000$$",
        },
        {
          correct: false,
          label: "$$\\frac{3}{2}C + 1{.}000$$",
        },
        {
          correct: false,
          label: "$$2C + 2{.}000$$",
        },
      ],
    },
  },
};

export default item;
