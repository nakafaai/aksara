import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\dfrac{9}{50}$$" },
        { correct: false, label: "$$\\dfrac{1}{3}$$" },
        { correct: false, label: "$$\\dfrac{26}{75}$$" },
        { correct: true, label: "$$\\dfrac{9}{25}$$" },
        { correct: false, label: "$$\\dfrac{29}{75}$$" },
      ],
    },
  },
};

export default item;
