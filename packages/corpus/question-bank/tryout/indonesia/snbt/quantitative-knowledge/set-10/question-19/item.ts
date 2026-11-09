import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$\\dfrac{12}{25}$$" },
        { correct: false, label: "$$\\dfrac12$$" },
        { correct: false, label: "$$\\dfrac{13}{25}$$" },
        { correct: false, label: "$$\\dfrac35$$" },
        { correct: false, label: "$$\\dfrac{21}{25}$$" },
      ],
    },
  },
};

export default item;
