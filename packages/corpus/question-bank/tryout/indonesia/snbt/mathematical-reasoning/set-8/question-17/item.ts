import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "blood-donor",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$\\dfrac{2}{13}$$" },
        { correct: false, label: "$$\\dfrac{2}{11}$$" },
        { correct: false, label: "$$\\dfrac{1}{5}$$" },
        { correct: false, label: "$$\\dfrac{3}{13}$$" },
        { correct: false, label: "$$\\dfrac{2}{3}$$" },
      ],
    },
  },
};

export default item;
