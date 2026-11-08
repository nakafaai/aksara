import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "paper-folding",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$4$$" },
        { correct: false, label: "$$5$$" },
        { correct: true, label: "$$6$$" },
        { correct: false, label: "$$7$$" },
        { correct: false, label: "$$60$$" },
      ],
    },
  },
};

export default item;
