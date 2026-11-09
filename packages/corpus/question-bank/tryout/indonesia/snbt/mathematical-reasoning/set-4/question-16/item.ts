import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "can-design",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$6$$" },
        { correct: false, label: "$$12$$" },
        { correct: false, label: "$$16$$" },
        { correct: false, label: "$$20$$" },
        { correct: true, label: "$$24$$" },
      ],
    },
  },
};

export default item;
