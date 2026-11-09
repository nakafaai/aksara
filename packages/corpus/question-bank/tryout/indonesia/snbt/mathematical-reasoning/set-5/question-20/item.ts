import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "bank-pin",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\dfrac{1}{5040}$$" },
        { correct: false, label: "$$\\dfrac{1}{3360}$$" },
        { correct: true, label: "$$\\dfrac{1}{1680}$$" },
        { correct: false, label: "$$\\dfrac{1}{1000}$$" },
        { correct: false, label: "$$\\dfrac{3}{1000}$$" },
      ],
    },
  },
};

export default item;
