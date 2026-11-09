import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\dfrac{3}{38}$$" },
        { correct: false, label: "$$\\dfrac{49}{190}$$" },
        { correct: false, label: "$$\\dfrac13$$" },
        { correct: true, label: "$$\\dfrac{32}{95}$$" },
        { correct: false, label: "$$\\dfrac25$$" },
      ],
    },
  },
};

export default item;
