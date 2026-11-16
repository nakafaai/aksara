import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\dfrac{1}{4}$$" },
        { correct: false, label: "$$\\dfrac{1}{3}$$" },
        { correct: true, label: "$$\\dfrac{3}{8}$$" },
        { correct: false, label: "$$\\dfrac{51}{128}$$" },
        { correct: false, label: "$$\\dfrac{9}{16}$$" },
      ],
    },
  },
};

export default item;
