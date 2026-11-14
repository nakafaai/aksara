import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\dfrac{21}{4}\\text{ cm}^2$$" },
        { correct: false, label: "$$\\dfrac{15}{2}\\text{ cm}^2$$" },
        { correct: true, label: "$$\\dfrac{75}{4}\\text{ cm}^2$$" },
        { correct: false, label: "$$24\\text{ cm}^2$$" },
        { correct: false, label: "$$\\dfrac{75}{2}\\text{ cm}^2$$" },
      ],
    },
  },
};

export default item;
