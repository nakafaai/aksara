import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$3$$" },
        { correct: false, label: "$$4$$" },
        { correct: false, label: "$$6$$" },
        { correct: false, label: "$$8$$" },
        { correct: false, label: "$$10$$" },
      ],
    },
  },
};

export default item;
