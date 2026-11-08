import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\dfrac18$$" },
        { correct: true, label: "$$\\dfrac14$$" },
        { correct: false, label: "$$\\dfrac13$$" },
        { correct: false, label: "$$\\dfrac12$$" },
        { correct: false, label: "$$\\dfrac34$$" },
      ],
    },
  },
};

export default item;
