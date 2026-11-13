import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\frac{8}{19}$$" },
        { correct: false, label: "$$\\frac{6}{19}$$" },
        { correct: false, label: "$$\\frac{5}{19}$$" },
        { correct: true, label: "$$\\frac{4}{19}$$" },
        { correct: false, label: "$$\\frac{3}{19}$$" },
      ],
    },
  },
};

export default item;
