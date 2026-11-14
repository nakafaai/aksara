import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\dfrac{1}{76}$$" },
        { correct: true, label: "$$\\dfrac{1}{38}$$" },
        { correct: false, label: "$$\\dfrac{11}{380}$$" },
        { correct: false, label: "$$\\dfrac{3}{38}$$" },
        { correct: false, label: "$$\\dfrac{3}{19}$$" },
      ],
    },
  },
};

export default item;
