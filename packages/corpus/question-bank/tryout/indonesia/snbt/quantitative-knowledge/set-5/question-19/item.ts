import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\dfrac{5}{16}$$" },
        { correct: false, label: "$$\\dfrac{15}{32}$$" },
        { correct: true, label: "$$\\dfrac12$$" },
        { correct: false, label: "$$\\dfrac{13}{16}$$" },
        { correct: false, label: "$$\\dfrac{31}{32}$$" },
      ],
    },
  },
};

export default item;
