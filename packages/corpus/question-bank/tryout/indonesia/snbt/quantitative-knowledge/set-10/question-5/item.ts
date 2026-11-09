import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$3$$" },
        { correct: false, label: "$$5$$" },
        { correct: true, label: "$$6$$" },
        { correct: false, label: "$$8$$" },
        { correct: false, label: "$$10$$" },
      ],
    },
  },
};

export default item;
