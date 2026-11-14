import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2$$" },
        { correct: false, label: "$$3$$" },
        { correct: true, label: "$$6$$" },
        { correct: false, label: "$$12$$" },
        { correct: false, label: "$$15$$" },
      ],
    },
  },
};

export default item;
