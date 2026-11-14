import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$-\\dfrac{5}{3}$$" },
        { correct: false, label: "$$\\dfrac{7}{3}$$" },
        { correct: false, label: "$$\\dfrac{8}{3}$$" },
        { correct: false, label: "$$\\dfrac{18}{5}$$" },
        { correct: true, label: "$$\\dfrac{11}{3}$$" },
      ],
    },
  },
};

export default item;
