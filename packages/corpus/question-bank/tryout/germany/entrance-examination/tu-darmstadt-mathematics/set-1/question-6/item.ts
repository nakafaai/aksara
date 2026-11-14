import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{12}{5}$$",
        },
        {
          correct: false,
          label: "$$\\frac{60}{169}$$",
        },
        {
          correct: false,
          label: "$$\\frac{5}{12}$$ oder $$\\frac{12}{5}$$",
        },
        {
          correct: true,
          label: "$$\\frac{5}{12}$$",
        },
        {
          correct: false,
          label: "$$\\frac{120}{169}$$",
        },
        {
          correct: false,
          label: "Einen solchen Winkel gibt es nicht.",
        },
      ],
    },
  },
};

export default item;
