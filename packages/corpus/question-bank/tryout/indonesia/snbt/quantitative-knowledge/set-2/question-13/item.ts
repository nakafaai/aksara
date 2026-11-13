import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$1:1$$" },
        { correct: false, label: "$$3:2$$" },
        { correct: true, label: "$$13:8$$" },
        { correct: false, label: "$$5:3$$" },
        { correct: false, label: "$$21:8$$" },
      ],
    },
  },
};

export default item;
