import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$90$$" },
        { correct: false, label: "$$27$$" },
        { correct: false, label: "$$25$$" },
        { correct: true, label: "$$23$$" },
        { correct: false, label: "$$18$$" },
      ],
    },
  },
};

export default item;
