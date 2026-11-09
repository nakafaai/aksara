import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\dfrac{1}{10}$$" },
        { correct: true, label: "$$\\dfrac{1}{5}$$" },
        { correct: false, label: "$$\\dfrac{3}{10}$$" },
        { correct: false, label: "$$\\dfrac{2}{5}$$" },
        { correct: false, label: "$$\\dfrac{8}{15}$$" },
      ],
    },
  },
};

export default item;
