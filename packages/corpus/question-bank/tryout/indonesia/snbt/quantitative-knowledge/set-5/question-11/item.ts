import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$4\\sqrt3$$" },
        { correct: false, label: "$$8$$" },
        { correct: false, label: "$$4\\sqrt6$$" },
        { correct: false, label: "$$10$$" },
        { correct: true, label: "$$14$$" },
      ],
    },
  },
};

export default item;
