import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$3$$" },
        { correct: false, label: "$$7$$" },
        { correct: false, label: "$$8$$" },
        { correct: true, label: "$$11$$" },
        { correct: false, label: "$$13$$" },
      ],
    },
  },
};

export default item;
