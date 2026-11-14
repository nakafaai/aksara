import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$6$$" },
        { correct: false, label: "$$8$$" },
        { correct: true, label: "$$18$$" },
        { correct: false, label: "$$20$$" },
        { correct: false, label: "$$26$$" },
      ],
    },
  },
};

export default item;
