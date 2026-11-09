import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$15$$" },
        { correct: false, label: "$$45$$" },
        { correct: false, label: "$$75$$" },
        { correct: true, label: "$$90$$" },
        { correct: false, label: "$$105$$" },
      ],
    },
  },
};

export default item;
