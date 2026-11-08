import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$-\\dfrac{12}{5}$$" },
        { correct: false, label: "$$-\\dfrac{5}{12}$$" },
        { correct: false, label: "$$0$$" },
        { correct: false, label: "$$\\dfrac{12}{5}$$" },
        { correct: false, label: "$$3$$" },
      ],
    },
  },
};

export default item;
