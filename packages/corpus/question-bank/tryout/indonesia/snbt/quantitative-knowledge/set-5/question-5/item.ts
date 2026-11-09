import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$-1$$" },
        { correct: false, label: "$$2$$" },
        { correct: false, label: "$$3$$" },
        { correct: true, label: "$$5$$" },
        { correct: false, label: "$$6$$" },
      ],
    },
  },
};

export default item;
