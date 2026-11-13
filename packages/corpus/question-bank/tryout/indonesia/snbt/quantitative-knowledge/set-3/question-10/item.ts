import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$\\dfrac{2}{35}$$" },
        { correct: false, label: "$$\\dfrac{1}{16}$$" },
        { correct: false, label: "$$\\dfrac{1}{10}$$" },
        { correct: false, label: "$$\\dfrac{2}{5}$$" },
        { correct: false, label: "$$\\dfrac{26}{35}$$" },
      ],
    },
  },
};

export default item;
