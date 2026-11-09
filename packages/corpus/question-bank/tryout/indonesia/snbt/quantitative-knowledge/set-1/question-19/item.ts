import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$12$$" },
        { correct: false, label: "$$16$$" },
        { correct: true, label: "$$24$$" },
        { correct: false, label: "$$36$$" },
        { correct: false, label: "$$48$$" },
      ],
    },
  },
};

export default item;
