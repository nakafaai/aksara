import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4$$",
        },
        {
          correct: false,
          label: "$$5$$",
        },
        {
          correct: false,
          label: "$$\\frac{60}{11}$$",
        },
        {
          correct: true,
          label: "$$\\frac{50}{11}$$",
        },
        {
          correct: false,
          label: "$$6$$",
        },
      ],
    },
  },
};

export default item;
