import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "loyalty-card",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0$$" },
        { correct: false, label: "$$4$$" },
        { correct: false, label: "$$8$$" },
        { correct: true, label: "$$12$$" },
        { correct: false, label: "$$16$$" },
      ],
    },
  },
};

export default item;
