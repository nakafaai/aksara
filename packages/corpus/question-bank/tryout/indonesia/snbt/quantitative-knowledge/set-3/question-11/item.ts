import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$-\\dfrac{5}{2}$$" },
        { correct: true, label: "$$-\\dfrac{1}{2}$$" },
        { correct: false, label: "$$0$$" },
        { correct: false, label: "$$\\dfrac{3}{2}$$" },
        { correct: false, label: "$$2$$" },
      ],
    },
  },
};

export default item;
