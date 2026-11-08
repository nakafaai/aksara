import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$-12$$" },
        { correct: false, label: "$$-6$$" },
        { correct: false, label: "$$-4$$" },
        { correct: false, label: "$$4$$" },
        { correct: false, label: "$$12$$" },
      ],
    },
  },
};

export default item;
