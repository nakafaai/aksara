import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$5$$" },
        { correct: false, label: "$$\\dfrac{10}{3}$$" },
        { correct: false, label: "$$3$$" },
        { correct: false, label: "$$\\dfrac{5}{2}$$" },
        { correct: true, label: "$$\\dfrac{5}{3}$$" },
      ],
    },
  },
};

export default item;
