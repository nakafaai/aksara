import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$6$$" },
        { correct: false, label: "$$10$$" },
        { correct: true, label: "$$15$$" },
        { correct: false, label: "$$45$$" },
        { correct: false, label: "$$90$$" },
      ],
    },
  },
};

export default item;
