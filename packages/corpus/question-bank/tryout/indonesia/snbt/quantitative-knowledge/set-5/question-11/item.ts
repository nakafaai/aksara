import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\dfrac14$$" },
        { correct: false, label: "$$\\dfrac12$$" },
        { correct: false, label: "$$\\dfrac{9}{16}$$" },
        { correct: true, label: "$$\\dfrac58$$" },
        { correct: false, label: "$$\\dfrac34$$" },
      ],
    },
  },
};

export default item;
