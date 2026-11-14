import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\dfrac{2}{33}$$" },
        { correct: true, label: "$$\\dfrac{6}{11}$$" },
        { correct: false, label: "$$\\dfrac{2}{3}$$" },
        { correct: false, label: "$$\\dfrac{10}{11}$$" },
        { correct: false, label: "$$\\dfrac{31}{33}$$" },
      ],
    },
  },
};

export default item;
