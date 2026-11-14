import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\frac18\\text{ liter}$$" },
        { correct: true, label: "$$\\frac78\\text{ liter}$$" },
        { correct: false, label: "$$\\frac72\\text{ liter}$$" },
        { correct: false, label: "$$\\frac{35}{4}\\text{ liter}$$" },
        { correct: false, label: "$$\\frac{133}{8}\\text{ liter}$$" },
      ],
    },
  },
};

export default item;
