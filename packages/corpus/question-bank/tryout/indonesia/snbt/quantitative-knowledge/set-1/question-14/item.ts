import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\dfrac{9\\sqrt3}{2}\\text{ cm}^2$$" },
        { correct: false, label: "$$9\\sqrt3\\text{ cm}^2$$" },
        { correct: false, label: "$$\\dfrac{27\\sqrt3}{2}\\text{ cm}^2$$" },
        { correct: false, label: "$$18\\sqrt3\\text{ cm}^2$$" },
        { correct: true, label: "$$27\\sqrt3\\text{ cm}^2$$" },
      ],
    },
  },
};

export default item;
