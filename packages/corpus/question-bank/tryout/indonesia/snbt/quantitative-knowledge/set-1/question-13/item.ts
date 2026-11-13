import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\dfrac{1}{15}$$" },
        { correct: false, label: "$$\\dfrac{3}{35}$$" },
        { correct: false, label: "$$\\dfrac{2}{21}$$" },
        { correct: true, label: "$$\\dfrac{11}{105}$$" },
        { correct: false, label: "$$\\dfrac{1}{7}$$" },
      ],
    },
  },
};

export default item;
