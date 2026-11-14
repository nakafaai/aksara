import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "loan-plans",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2$$" },
        { correct: false, label: "$$3$$" },
        { correct: false, label: "$$4$$" },
        { correct: false, label: "$$7$$" },
        { correct: true, label: "$$8$$" },
      ],
    },
  },
};

export default item;
