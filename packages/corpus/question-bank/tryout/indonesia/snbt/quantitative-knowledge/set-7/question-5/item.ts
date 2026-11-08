import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$10$$" },
        { correct: false, label: "$$12$$" },
        { correct: false, label: "$$14$$" },
        { correct: false, label: "$$18$$" },
        { correct: false, label: "$$26$$" },
      ],
    },
  },
};

export default item;
