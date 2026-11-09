import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$\\dfrac13$$" },
        { correct: false, label: "$$\\dfrac{44}{125}$$" },
        { correct: false, label: "$$\\dfrac25$$" },
        { correct: false, label: "$$\\dfrac35$$" },
        { correct: false, label: "$$\\dfrac23$$" },
      ],
    },
  },
};

export default item;
