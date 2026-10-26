import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{3}{8}$$",
        },
        {
          correct: false,
          label: "$$\\frac{7}{12}$$",
        },
        {
          correct: true,
          label: "$$\\frac{5}{8}$$",
        },
        {
          correct: false,
          label: "$$\\frac{2}{3}$$",
        },
        {
          correct: false,
          label: "$$\\frac{15}{8}$$",
        },
      ],
    },
  },
};

export default item;
