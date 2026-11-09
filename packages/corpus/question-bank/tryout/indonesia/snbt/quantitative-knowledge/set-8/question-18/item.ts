import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$21$$" },
        { correct: false, label: "$$28$$" },
        { correct: false, label: "$$36$$" },
        { correct: false, label: "$$45$$" },
        { correct: false, label: "$$56$$" },
      ],
    },
  },
};

export default item;
