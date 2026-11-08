import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$140$$" },
        { correct: false, label: "$$160$$" },
        { correct: false, label: "$$180$$" },
        { correct: true, label: "$$200$$" },
        { correct: false, label: "$$240$$" },
      ],
    },
  },
};

export default item;
