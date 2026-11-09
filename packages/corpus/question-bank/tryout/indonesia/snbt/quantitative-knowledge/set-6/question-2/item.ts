import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$8$$" },
        { correct: false, label: "$$12$$" },
        { correct: false, label: "$$15$$" },
        { correct: true, label: "$$16$$" },
        { correct: false, label: "$$23$$" },
      ],
    },
  },
};

export default item;
