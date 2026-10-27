import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{1}{5} > \\frac{2}{9}$$",
        },
        {
          correct: false,
          label: "$$\\frac{2}{3} > \\frac{7}{8}$$",
        },
        {
          correct: false,
          label: "$$\\frac{3}{5} > \\frac{5}{6}$$",
        },
        {
          correct: true,
          label: "$$\\frac{3}{7} > \\frac{1}{3}$$",
        },
        {
          correct: false,
          label: "$$\\frac{5}{9} > \\frac{3}{4}$$",
        },
      ],
    },
  },
};

export default item;
