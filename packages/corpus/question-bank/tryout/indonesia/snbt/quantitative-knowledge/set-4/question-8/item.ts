import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$4$$" },
        { correct: true, label: "$$5$$" },
        { correct: false, label: "$$8$$" },
        { correct: false, label: "$$13$$" },
        { correct: false, label: "$$20$$" },
      ],
    },
  },
};

export default item;
