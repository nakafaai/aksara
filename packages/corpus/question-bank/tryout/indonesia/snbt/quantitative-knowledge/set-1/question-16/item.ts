import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$15$$" },
        { correct: false, label: "$$\\dfrac{53}{4}$$" },
        { correct: false, label: "$$\\dfrac{41}{18}$$" },
        { correct: false, label: "$$\\dfrac{4}{53}$$" },
        { correct: false, label: "$$-\\dfrac{1}{9}$$" },
      ],
    },
  },
};

export default item;
