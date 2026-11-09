import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$1$$" },
        { correct: true, label: "$$4$$" },
        { correct: false, label: "$$5$$" },
        { correct: false, label: "$$6$$" },
        { correct: false, label: "$$10$$" },
      ],
    },
  },
};

export default item;
