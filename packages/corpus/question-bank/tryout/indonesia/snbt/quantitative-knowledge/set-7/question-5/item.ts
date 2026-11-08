import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$16$$" },
        { correct: false, label: "$$18$$" },
        { correct: false, label: "$$20$$" },
        { correct: false, label: "$$24$$" },
        { correct: false, label: "$$26$$" },
      ],
    },
  },
};

export default item;
