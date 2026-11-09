import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$7$$" },
        { correct: false, label: "$$8$$" },
        { correct: true, label: "$$9$$" },
        { correct: false, label: "$$10$$" },
        { correct: false, label: "$$17$$" },
      ],
    },
  },
};

export default item;
