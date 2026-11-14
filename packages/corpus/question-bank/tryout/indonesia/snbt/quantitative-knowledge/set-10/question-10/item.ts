import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$\\dfrac{3}{10}$$" },
        { correct: false, label: "$$\\dfrac{9}{25}$$" },
        { correct: false, label: "$$\\dfrac{9}{20}$$" },
        { correct: false, label: "$$\\dfrac{1}{2}$$" },
        { correct: false, label: "$$\\dfrac{3}{5}$$" },
      ],
    },
  },
};

export default item;
