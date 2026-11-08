import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$x=-3$$",
        },
        {
          correct: false,
          label: "$$x=-\\frac83$$",
        },
        {
          correct: false,
          label: "$$x=\\frac43$$",
        },
        {
          correct: false,
          label: "$$x=\\frac{11}3$$",
        },
        {
          correct: true,
          label: "$$x=4$$",
        },
        {
          correct: false,
          label: "$$x=12$$",
        },
      ],
    },
  },
};

export default item;
