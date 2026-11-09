import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$16$$" },
        { correct: false, label: "$$32$$" },
        { correct: false, label: "$$40$$" },
        { correct: false, label: "$$48$$" },
        { correct: false, label: "$$56$$" },
      ],
    },
  },
};

export default item;
