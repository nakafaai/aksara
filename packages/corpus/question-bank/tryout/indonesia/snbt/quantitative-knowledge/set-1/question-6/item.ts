import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$12$$" },
        { correct: true, label: "$$14$$" },
        { correct: false, label: "$$15$$" },
        { correct: false, label: "$$20$$" },
        { correct: false, label: "$$21$$" },
      ],
    },
  },
};

export default item;
