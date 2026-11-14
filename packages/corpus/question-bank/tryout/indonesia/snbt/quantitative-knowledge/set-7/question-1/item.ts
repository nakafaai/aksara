import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$6$$" },
        { correct: false, label: "$$10$$" },
        { correct: true, label: "$$12$$" },
        { correct: false, label: "$$15$$" },
        { correct: false, label: "$$38$$" },
      ],
    },
  },
};

export default item;
