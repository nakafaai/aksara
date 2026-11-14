import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0$$" },
        { correct: true, label: "$$\\dfrac{\\sqrt{5}}{5}$$" },
        { correct: false, label: "$$\\dfrac{3}{5}$$" },
        { correct: false, label: "$$\\dfrac{2}{3}$$" },
        { correct: false, label: "$$\\dfrac{\\sqrt{5}}{3}$$" },
      ],
    },
  },
};

export default item;
