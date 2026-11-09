import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$6$$" },
        { correct: false, label: "$$8$$" },
        { correct: false, label: "$$14$$" },
        { correct: true, label: "$$16$$" },
        { correct: false, label: "$$32$$" },
      ],
    },
  },
};

export default item;
