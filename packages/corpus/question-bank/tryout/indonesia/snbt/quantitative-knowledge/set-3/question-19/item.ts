import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\dfrac{1}{6}$$" },
        { correct: false, label: "$$\\dfrac{5}{18}$$" },
        { correct: false, label: "$$\\dfrac{5}{9}$$" },
        { correct: false, label: "$$\\dfrac{56}{81}$$" },
        { correct: true, label: "$$\\dfrac{13}{18}$$" },
      ],
    },
  },
};

export default item;
