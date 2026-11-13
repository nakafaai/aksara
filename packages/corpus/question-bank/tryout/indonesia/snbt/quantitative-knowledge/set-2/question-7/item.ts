import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$\\dfrac35\\text{ cm}$$" },
        { correct: false, label: "$$\\dfrac65\\text{ cm}$$" },
        { correct: false, label: "$$\\dfrac32\\text{ cm}$$" },
        { correct: false, label: "$$\\dfrac{21}{10}\\text{ cm}$$" },
        { correct: false, label: "$$\\dfrac{18}{5}\\text{ cm}$$" },
      ],
    },
  },
};

export default item;
