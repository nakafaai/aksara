import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\dfrac{1}{3}$$" },
        { correct: true, label: "$$\\dfrac{4}{9}$$" },
        { correct: false, label: "$$\\dfrac{5}{9}$$" },
        { correct: false, label: "$$\\dfrac{2}{3}$$" },
        { correct: false, label: "$$\\dfrac{4}{5}$$" },
      ],
    },
  },
};

export default item;
