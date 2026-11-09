import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$-9$$" },
        { correct: false, label: "$$-1$$" },
        { correct: false, label: "$$7$$" },
        { correct: false, label: "$$8$$" },
        { correct: false, label: "$$9$$" },
      ],
    },
  },
};

export default item;
