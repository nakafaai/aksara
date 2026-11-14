import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$\\dfrac{7}{32}$$" },
        { correct: false, label: "$$\\dfrac{1}{4}$$" },
        { correct: false, label: "$$\\dfrac{35}{128}$$" },
        { correct: false, label: "$$\\dfrac{1}{3}$$" },
        { correct: false, label: "$$\\dfrac{21}{32}$$" },
      ],
    },
  },
};

export default item;
