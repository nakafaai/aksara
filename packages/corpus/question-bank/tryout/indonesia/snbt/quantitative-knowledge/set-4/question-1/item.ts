import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0$$" },
        { correct: false, label: "$$2$$" },
        { correct: false, label: "$$6$$" },
        { correct: false, label: "$$16$$" },
        { correct: true, label: "$$42$$" },
      ],
    },
  },
};

export default item;
