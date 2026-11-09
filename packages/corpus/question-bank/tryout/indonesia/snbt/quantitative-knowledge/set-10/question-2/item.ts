import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$-\\dfrac{10}{9}$$" },
        { correct: false, label: "$$-1$$" },
        { correct: false, label: "$$-\\dfrac{9}{10}$$" },
        { correct: false, label: "$$\\dfrac{9}{10}$$" },
        { correct: false, label: "$$\\dfrac{10}{9}$$" },
      ],
    },
  },
};

export default item;
