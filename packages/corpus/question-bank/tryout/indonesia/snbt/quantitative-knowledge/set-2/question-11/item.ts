import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$-\\dfrac{37}{12}$$" },
        { correct: false, label: "$$-\\dfrac{35}{12}$$" },
        { correct: false, label: "$$-\\dfrac{1}{12}$$" },
        { correct: false, label: "$$1$$" },
        { correct: false, label: "$$\\dfrac{37}{12}$$" },
      ],
    },
  },
};

export default item;
