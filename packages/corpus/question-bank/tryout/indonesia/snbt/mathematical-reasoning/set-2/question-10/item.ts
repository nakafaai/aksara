import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{3}{70}$$",
        },
        {
          correct: true,
          label: "$$\\frac{12}{70}$$",
        },
        {
          correct: false,
          label: "$$\\frac{7}{20}$$",
        },
        {
          correct: false,
          label: "$$\\frac{17}{20}$$",
        },
        {
          correct: false,
          label: "$$\\frac{61}{70}$$",
        },
      ],
    },
  },
};

export default item;
