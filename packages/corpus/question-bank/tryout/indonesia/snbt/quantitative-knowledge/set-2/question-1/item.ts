import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$16$$" },
        { correct: true, label: "$$36$$" },
        { correct: false, label: "$$64$$" },
        { correct: false, label: "$$76$$" },
        { correct: false, label: "$$96$$" },
      ],
    },
  },
};

export default item;
