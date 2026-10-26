import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{1}{10}(x^2+6x+8)^5 + \\frac{1}{10}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{10}(x^2+6x+8)^5 + \\frac{11}{10}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{10}(x^2+6x+8)^5 + \\frac{31}{10}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{10}(x^2+6x+8)^5 + \\frac{41}{10}$$",
        },
        {
          correct: true,
          label: "$$\\frac{1}{10}(x^2+6x+8)^5 + \\frac{21}{10}$$",
        },
      ],
    },
  },
};

export default item;
