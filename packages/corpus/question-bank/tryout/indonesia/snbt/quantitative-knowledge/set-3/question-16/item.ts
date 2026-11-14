import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$7x+8$$" },
        { correct: false, label: "$$7x+6$$" },
        { correct: false, label: "$$8x+7$$" },
        { correct: false, label: "$$15x+1$$" },
        { correct: false, label: "$$7x+7$$" },
      ],
    },
  },
};

export default item;
