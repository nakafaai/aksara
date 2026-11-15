import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$-\\sqrt5-1$$",
        },
        {
          correct: false,
          label: "$$\\frac{5+\\sqrt5}{2}$$",
        },
        {
          correct: false,
          label: "$$\\sqrt5-1$$",
        },
        {
          correct: true,
          label: "$$\\sqrt5+1$$",
        },
        {
          correct: false,
          label: "$$\\frac{2\\sqrt5+2}{3}$$",
        },
        {
          correct: false,
          label: "$$-\\frac{5+\\sqrt5}{2}$$",
        },
      ],
    },
  },
};

export default item;
