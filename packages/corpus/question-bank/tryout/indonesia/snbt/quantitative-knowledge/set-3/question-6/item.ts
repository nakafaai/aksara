import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$4$$" },
        { correct: true, label: "$$6$$" },
        { correct: false, label: "$$12$$" },
        { correct: false, label: "$$24$$" },
        { correct: false, label: "tidak dapat ditentukan" },
      ],
    },
  },
};

export default item;
