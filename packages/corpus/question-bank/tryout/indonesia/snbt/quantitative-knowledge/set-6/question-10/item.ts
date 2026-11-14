import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\dfrac{1}{9}$$" },
        { correct: false, label: "$$\\dfrac{2}{15}$$" },
        { correct: false, label: "$$\\dfrac{2}{9}$$" },
        { correct: false, label: "$$\\dfrac{1}{4}$$" },
        { correct: true, label: "$$\\dfrac{4}{15}$$" },
      ],
    },
  },
};

export default item;
