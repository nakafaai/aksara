import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$1:3$$" },
        { correct: true, label: "$$3:1$$" },
        { correct: false, label: "$$1:2$$" },
        { correct: false, label: "$$2:1$$" },
        { correct: false, label: "$$3:2$$" },
      ],
    },
  },
};

export default item;
