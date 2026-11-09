import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$-\\dfrac{4}{3}$$" },
        { correct: false, label: "$$-\\dfrac{3}{4}$$" },
        { correct: false, label: "$$0$$" },
        { correct: true, label: "$$\\dfrac{3}{4}$$" },
        { correct: false, label: "$$\\dfrac{4}{3}$$" },
      ],
    },
  },
};

export default item;
