import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac9{10}$$",
        },
        {
          correct: true,
          label: "$$\\frac{36}{37}$$",
        },
        {
          correct: false,
          label: "$$\\frac{18}{19}$$",
        },
        {
          correct: false,
          label: "$$\\frac{81}{83}$$",
        },
        {
          correct: false,
          label: "$$\\frac{40}{41}$$",
        },
      ],
    },
  },
};

export default item;
