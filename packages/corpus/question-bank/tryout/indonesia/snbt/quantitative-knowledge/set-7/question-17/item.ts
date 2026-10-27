import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$3$$" },
        { correct: true, label: "$$7$$" },
        { correct: false, label: "$$5$$" },
        { correct: false, label: "$$10$$" },
        { correct: false, label: "$$13$$" },
      ],
    },
  },
};

export default item;
