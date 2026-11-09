import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\dfrac{3}{10}$$" },
        { correct: false, label: "$$\\dfrac{2}{5}$$" },
        { correct: false, label: "$$\\dfrac{1}{2}$$" },
        { correct: false, label: "$$\\dfrac{3}{5}$$" },
        { correct: true, label: "$$\\dfrac{3}{4}$$" },
      ],
    },
  },
};

export default item;
