import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{1}{72}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{27}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{16}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{12}$$",
        },
        {
          correct: true,
          label: "$$\\frac{1}{6}$$",
        },
      ],
    },
  },
};

export default item;
