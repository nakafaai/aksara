import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$1$$" },
        { correct: false, label: "$$6$$" },
        { correct: true, label: "$$8$$" },
        { correct: false, label: "$$12$$" },
        { correct: false, label: "$$24$$" },
      ],
    },
  },
};

export default item;
