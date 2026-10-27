import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{32}{40}$$",
        },
        {
          correct: false,
          label: "$$\\frac{21}{40}$$",
        },
        {
          correct: true,
          label: "$$\\frac{37}{40}$$",
        },
        {
          correct: false,
          label: "$$\\frac{15}{40}$$",
        },
        {
          correct: false,
          label: "$$\\frac{9}{40}$$",
        },
      ],
    },
  },
};

export default item;
