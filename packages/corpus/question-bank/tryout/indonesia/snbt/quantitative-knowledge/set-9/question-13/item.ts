import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\dfrac{135}{4}\\text{ cm}^2$$" },
        { correct: true, label: "$$108\\text{ cm}^2$$" },
        { correct: false, label: "$$\\dfrac{567}{4}\\text{ cm}^2$$" },
        { correct: false, label: "$$168\\text{ cm}^2$$" },
        { correct: false, label: "$$216\\text{ cm}^2$$" },
      ],
    },
  },
};

export default item;
