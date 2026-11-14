import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\dfrac{9}{29}$$" },
        { correct: false, label: "$$\\dfrac13$$" },
        { correct: true, label: "$$\\dfrac{9}{13}$$" },
        { correct: false, label: "$$\\dfrac{81}{100}$$" },
        { correct: false, label: "$$\\dfrac{81}{85}$$" },
      ],
    },
  },
};

export default item;
