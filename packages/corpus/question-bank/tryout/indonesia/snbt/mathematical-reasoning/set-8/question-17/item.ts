import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\frac45$$",
        },
        {
          correct: false,
          label: "$$\\frac{16}{25}$$",
        },
        {
          correct: false,
          label: "$$\\frac23$$",
        },
        {
          correct: false,
          label: "$$\\frac34$$",
        },
        {
          correct: false,
          label: "$$\\frac9{10}$$",
        },
      ],
    },
  },
};

export default item;
