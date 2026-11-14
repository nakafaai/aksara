import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\dfrac{13}{16}$$" },
        { correct: false, label: "$$\\dfrac58$$" },
        { correct: false, label: "$$\\dfrac12$$" },
        { correct: true, label: "$$\\dfrac{5}{16}$$" },
        { correct: false, label: "$$\\dfrac14$$" },
      ],
    },
  },
};

export default item;
