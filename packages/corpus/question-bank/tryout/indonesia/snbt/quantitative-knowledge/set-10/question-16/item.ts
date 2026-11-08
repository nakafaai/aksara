import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$10$$" },
        { correct: true, label: "$$20$$" },
        { correct: false, label: "$$30$$" },
        { correct: false, label: "$$40$$" },
        { correct: false, label: "$$60$$" },
      ],
    },
  },
};

export default item;
