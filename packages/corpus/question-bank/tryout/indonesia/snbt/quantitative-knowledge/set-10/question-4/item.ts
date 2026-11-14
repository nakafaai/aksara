import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\dfrac{cd}{c-d}$$" },
        { correct: false, label: "$$\\dfrac{cd}{d-c}$$" },
        { correct: false, label: "$$\\dfrac{cd}{2c-d}$$" },
        { correct: false, label: "$$\\dfrac{cd}{c+d}$$" },
        { correct: true, label: "$$\\dfrac{cd}{2d-c}$$" },
      ],
    },
  },
};

export default item;
