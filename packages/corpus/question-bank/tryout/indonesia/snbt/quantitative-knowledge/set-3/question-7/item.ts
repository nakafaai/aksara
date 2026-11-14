import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$4$$" },
        { correct: false, label: "$$7$$" },
        { correct: true, label: "$$8$$" },
        { correct: false, label: "$$9$$" },
        { correct: false, label: "$$15$$" },
      ],
    },
  },
};

export default item;
