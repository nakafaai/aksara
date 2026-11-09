import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$-8$$" },
        { correct: false, label: "$$-6$$" },
        { correct: false, label: "$$2$$" },
        { correct: false, label: "$$6$$" },
        { correct: false, label: "$$8$$" },
      ],
    },
  },
};

export default item;
