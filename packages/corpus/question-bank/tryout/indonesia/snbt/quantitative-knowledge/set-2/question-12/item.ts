import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\dfrac{5}{12}$$" },
        { correct: false, label: "$$\\dfrac12$$" },
        { correct: false, label: "$$\\dfrac{13}{20}$$" },
        { correct: false, label: "$$\\dfrac{7}{10}$$" },
        { correct: true, label: "$$\\dfrac34$$" },
      ],
    },
  },
};

export default item;
