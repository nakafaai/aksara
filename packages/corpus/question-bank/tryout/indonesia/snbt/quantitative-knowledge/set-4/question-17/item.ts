import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$93$$" },
        { correct: false, label: "$$48$$" },
        { correct: false, label: "$$45$$" },
        { correct: false, label: "$$\\frac{93}{4}$$" },
        { correct: false, label: "$$21$$" },
      ],
    },
  },
};

export default item;
