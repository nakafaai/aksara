import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$-7$$" },
        { correct: false, label: "$$-4$$" },
        { correct: false, label: "$$-1$$" },
        { correct: false, label: "$$3$$" },
        { correct: false, label: "$$7$$" },
      ],
    },
  },
};

export default item;
