import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{8}{3}$$",
        },
        {
          correct: true,
          label: "$$-\\frac{17}{6}$$",
        },
        {
          correct: false,
          label: "$$-\\frac{8}{3}$$",
        },
        {
          correct: false,
          label: "$$\\frac{17}{6}$$",
        },
        {
          correct: false,
          label: "$$\\frac{19}{9}$$",
        },
      ],
    },
  },
};

export default item;
